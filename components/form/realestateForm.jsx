import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
// import CurrencyList from "currency-list";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  Select,
  ModalFooter,
  useToast,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import useGeolocation from "../../hooks/geoLocation";
import { propertyAddSchima } from "../../Schima";
import { baseURL } from "../../utility/baseURL";
import { getUser } from "../../utility/authentication";
import baseAxios from "../../utility/axiosConfig";

const inputField = {
  name: "",
  photo: "",
  country: "",
  city: "",
  type_id: "",
  property_age_years: "",
  property_age_months: "",
  authorized: "",
  purchasing_cost: "",
  cost_currency: "SAR",
  cost_date: "",
  purpose: "",
  number_of_floors: "",
  invoice_file: "",
  user_id: "",
  location: [],
};

export default function RealestateForm({
  realestates,
  isEdit,
  data,
  onClose,
  setRealestate,
}) {
  const { access_token, userType } = getUser();
  const [uType, setUType] = useState("");
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [currency, setCurrency] = useState(["SAR", "USD"]);
  const [type, setType] = useState([]);
  const [user, setUser] = useState([]);
  const [location, setLocation] = useState([]);
  const [error, setErrors] = useState([]);
  const router = useNavigate();
  const toast = useToast();
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  const geoLocation = useGeolocation();

  const addValue = (setValues, data) => {
    const blobUrlToFile = (blobUrl) =>
      new Promise((resolve) => {
        fetch(blobUrl).then((res) => {
          res.blob().then((blob) => {
            // please change the file.extension with something more meaningful
            // or create a utility function to parse from URL
            const file = new File([blob], "file.extension", {
              type: blob.type,
            });
            resolve(file);
            return file;
          });
        });
      });
    console.log(data);
    let image;
    blobUrlToFile(data.photo).then((res) => {
      console.log("image", res);
      image = res;
    });
    setValues({
      name: data.name,
      photo: image,
      country: data.country,
      city: data.city,
      type_id: data.type.id,
      property_age_years: data.property_age_years,
      property_age_months: data.property_age_months,
      authorized: data.authorized,
      purchasing_cost: data.purchasing_cost,
      cost_currency: data.cost_currency,
      cost_date: data.cost_date,
      purpose: data.purpose,
      number_of_floors: data.number_of_floors,
      invoice_file: data.invoice_file,
      user_id: data.user.id,
      location: data.location,
    });
  };

  const handleCountry = (e) => {
    handleChange(e);
    const { value } = e.target;
    setFieldValue("country", value);

    baseAxios
      .get(`/city/${value}/?is_active=True`)
      .then((res) => {
        let c = [];
        res.data.map((item) => c.push({ key: item.name, value: item.id }));
        setCity(c);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const months = () => {
    let option = [];
    for (let i = 0; i <= 12; i++) {
      option.push({ key: i.toString(), value: i.toString() });
    }
    return option;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(values);
    delete values.photo;
    baseAxios
      .patch(baseURL + `/realestate/edit/${data[0].id}/`, values, {
        headers: headers,
      })
      .then((res) => {
        console.log("data", res);

        setRealestate([...realestates, res.data.data]);
        toast({
          title: "update Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Somethings wrong try again",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        if (error.response.status == 401) {
          toast({
            title: "You are not Login Login First",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          router("/login");
        }
      });

    onClose();
    handleReset();
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    touched,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: inputField,
    validationSchema: propertyAddSchima,
    onSubmit: (values) => {
      if (!access_token) {
        setErrors({ message: "You are not Login. First Login Then Create" });
        window.scrollTo(0, 0);
        return;
      }
      values.location = JSON.stringify(location);
      setFieldValue("location", location);
      if (!values.invoice_file) {
        delete values.invoice_file;
      }
      console.log("value", values);
      baseAxios
        .post(`/realestate/${userType}/`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + String(access_token),
          },
        })
        .then((res) => {
          setRealestate([...realestates, res.data.data]);
          onClose();
          toast({
            title: "Real Estate Add Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Somethings went wrong",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          window.scrollTo(0, 0);
          setValues({
            name: values.name,
            photo: values.photo,
            country: values.country,
            city: values.city,
            type_id: values.type_id,
            property_age_years: values.property_age_years,
            property_age_months: values.property_age_months,
            authorized: values.authorized,
            purchasing_cost: values.purchasing_cost,
            cost_currency: values.cost_currency,
            cost_date: values.cost_date,
            purpose: values.purpose,
            number_of_floors: values.number_of_floors,
            invoice_file: values.invoice_file,
            user_id: values.user_id,
            location: values.location,
          });
        });
    },
  });


  useEffect(() => {
    if (!isEdit && !data) {
      handleReset();
      console.log("reset")
    }
    if (isEdit && data) {
      addValue(setValues, data[0]);
    }
    const len = Object.keys(geoLocation.coordinates).length;
    if (len > 0) {
      setLocation([geoLocation.coordinates.lat, geoLocation.coordinates.lng]);
    }

    setUType(userType);
    baseAxios.get(
      "/country/?is_active=True"
    ).then(res=>{
      let c = [];
      res.data.map((item)=>c.push({ key: item.name, value: item.id }))
      setCountry(c)
    })

    baseAxios.get("/real-estate-type/").then((res) => {
      let type = [];
      res.data.map((item) =>
        type.push({ key: item.name, value: item.id.toString() })
      );
      setType(type);
    });

    if (uType === "Admin") {
      baseAxios.get("/all-user/").then((res) => {
        let u = [];
        res.data.results.map((item) =>
          u.push({ key: item.username, value: item.id.toString() })
        );
        setUser(u);
      });
    }
  }, [geoLocation.loaded]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormControl isInvalid={errors.name && touched.name}>
        <FormLabel>Real Estate Name</FormLabel>
        <Input
          placeholder="Real Estate Name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={100}
        />
        {errors.name && touched.name ? (
          <FormErrorMessage>{errors.name}.</FormErrorMessage>
        ) : null}
      </FormControl>
      <div className="md:flex justify-between">
        <div className=" md:w-1/2">
          <FormControl isInvalid={errors.type_id && touched.type_id}>
            <FormLabel>RealEstate State Type</FormLabel>
            <Select
              placeholder="RealEstate State Type"
              type="text"
              name="type_id"
              value={values.type_id}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {type.map((item, i) => (
                <option key={i} value={item.value}>
                  {item.key}
                </option>
              ))}
            </Select>
            {errors.type_id && touched.type_id ? (
              <FormErrorMessage>{errors.name}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>

        <div className="md:ml-2 md:w-1/2">
          <FormControl isInvalid={errors.photo && touched.photo}>
            <FormLabel>Image</FormLabel>
            <Input
              placeholder="Image"
              name="photo"
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue("photo", event.target.files[0]);
              }}
              accept=".jpg , .jpeg , .jfif , .pjpeg , .pjp , .gif , .png"
              type="file"
            />
            {errors.photo && touched.photo ? (
              <FormErrorMessage>{errors.photo}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>
      </div>

      <div className="md:flex justify-between">
        <div className=" md:w-1/2">
          <FormControl isInvalid={errors.country && touched.country}>
            <FormLabel>Country</FormLabel>
            <Select
              placeholder="Select Country"
              onChange={handleCountry}
              name="country"
              onBlur={handleBlur}
            >
              {country.map((item, i) => (
                <option key={i} value={item.value}>
                  {item.key}
                </option>
              ))}
            </Select>
            {errors.country && touched.country ? (
              <FormErrorMessage>{errors.country}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>

        <div className="md:ml-2 md:w-1/2">
          <FormControl isInvalid={errors.city && touched.city}>
            <FormLabel>City</FormLabel>
            <Select
              placeholder="Select City"
              onChange={handleChange}
              name="city"
              onBlur={handleBlur}
            >
              {city.map((item, i) => (
                <option key={i} value={item.value}>
                  {item.key}
                </option>
              ))}
            </Select>
            {errors.city && touched.city ? (
              <FormErrorMessage>{errors.city}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>
      </div>

      <div className="md:flex justify-between">
        <div className="md:ml-2 md:w-1/2">
            <FormControl
              isInvalid={
                errors.property_age_years && touched.property_age_years
              }
            >
              <FormLabel>Age of the Property (Years)</FormLabel>
              <Input
                placeholder="Age of the Property (Years) "
                type="text"
                name="property_age_years"
                value={values.property_age_years}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.property_age_years && touched.property_age_years ? (
                <FormErrorMessage>
                  {errors.property_age_years}.
                </FormErrorMessage>
              ) : null}
            </FormControl>
          </div>
          <div className="md:w-1/2 md:ml-2">
            <FormControl
              isInvalid={
                errors.property_age_months && touched.property_age_months
              }
            >
              <FormLabel>Age of the Property (Months)</FormLabel>
              <Select
                placeholder="Select Month"
                onChange={handleChange}
                onBlur={handleBlur}
                name="property_age_months"
              >
                {months().map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.key}
                  </option>
                ))}
              </Select>
              {errors.property_age_months && touched.property_age_months ? (
                <FormErrorMessage>
                  {errors.property_age_months}.
                </FormErrorMessage>
              ) : null}
            </FormControl>
          </div>
        
      </div>
      <div className="md:flex justify-between">
        <div className="md:w-1/2 md:ml-2">
          <FormControl isInvalid={errors.authorized && touched.authorized}>
          <FormLabel>Owned or Rented</FormLabel>
            <RadioGroup
              onBlur={handleBlur}
              onChange={(e)=>setFieldValue("authorized", e)}
              borderColor={"gray.400"}
              name="authorized"
            >
              <Stack spacing={4} direction="row">
                <Radio value="owned">Owned</Radio>
                <Radio value="rented">Rented</Radio>
              </Stack>
            </RadioGroup>
            {errors.authorized && touched.authorized ? (
              <FormErrorMessage>{errors.authorized}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>
        {uType === "Admin" && (
          <div className="md:w-1/2 md:ml-2">
            <FormControl isInvalid={errors.user_id && touched.user_id}>
              <FormLabel>User</FormLabel>
              <Select
                placeholder="Select User"
                onChange={handleChange}
                onBlur={handleBlur}
                name="user_id"
              >
                {user.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.key}
                  </option>
                ))}
              </Select>
              {errors.user_id && touched.user_id ? (
                <FormErrorMessage>{errors.user_id}.</FormErrorMessage>
              ) : null}
            </FormControl>
          </div>
        )}
      </div>

      <div className="md:flex justify-between">
        <div className="md:w-1/2 md:ml-2">
          <FormControl
            isInvalid={errors.purchasing_cost && touched.purchasing_cost}
          >
            <FormLabel>Purchasing / Rent Price or Cost</FormLabel>
            <Input
              placeholder="Purchasing / Rent Price or Cost"
              type="number"
              name="purchasing_cost"
              value={values.purchasing_cost}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.purchasing_cost && touched.purchasing_cost ? (
              <FormErrorMessage>{errors.purchasing_cost}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>
        <div className="md:w-1/2 md:ml-2">
          <FormControl
            isInvalid={errors.cost_currency && touched.cost_currency}
          >
            <FormLabel>Purchasing / Rent Currency"</FormLabel>
            <Select
              placeholder="Select Currency"
              onChange={handleChange}
              onBlur={handleBlur}
              name="cost_currency"
              defaultValue={values.cost_currency}
            >
              {currency.map((item, i) => (
                <option
                  key={i}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </Select>
            {errors.cost_currency && touched.cost_currency ? (
              <FormErrorMessage>{errors.cost_currency}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>
      </div>
      <div className="md:flex justify-between items-center">
        <div className="md:w-1/2 md:ml-2">
          <FormControl isInvalid={errors.cost_date && touched.cost_date}>
            <FormLabel>Purchasing / Rent Date</FormLabel>
            <Input
              placeholder="Purchasing / Rent Date"
              type="date"
              name="cost_date"
              value={values.cost_date}
              onBlur={handleBlur}
              onChange={handleChange}
              max={new Date().toISOString().slice(0, 10)}
            />
            {errors.cost_date && touched.cost_date ? (
              <FormErrorMessage>{errors.cost_date}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>
        <div className="md:w-1/2 md:ml-2 mt-4">
          <FormControl isInvalid={errors.purpose && touched.purpose}>
            <FormLabel>Purpose</FormLabel>
            <RadioGroup
              onBlur={handleBlur}
              onChange={(e)=>setFieldValue("purpose", e)}
              borderColor={"gray.400"}
              name="purpose"
              value={values.purpose}
            >
              <Stack spacing={4} direction="row">
                <Radio value="commercial">Commercial</Radio>
                <Radio value="personal">Personal</Radio>
              </Stack>
            </RadioGroup>
            {errors.purpose && touched.purpose ? (
              <FormErrorMessage>{errors.purpose}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>
      </div>
      <div className="md:flex justify-between">
        <div className="md:w-1/2">
          <FormControl
            isInvalid={errors.number_of_floors && touched.number_of_floors}
          >
            <FormLabel>Number of Floors</FormLabel>
            <Input
              placeholder="Number of Floors"
              type="text"
              name="number_of_floors"
              value={values.number_of_floors}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.number_of_floors && touched.number_of_floors ? (
              <FormErrorMessage>{errors.number_of_floors}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>
        <div className="md:w-1/2 ml-2">
          <FormControl isInvalid={errors.invoice_file && touched.invoice_file}>
            <FormLabel>Related Invoice</FormLabel>
            <Input
              placeholder="Upload Related Invoice"
              name="invoice_file"
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue("invoice_file", event.target.files[0]);
              }}
              accept=".jpg , .jpeg , .jfif , .pjpeg , .pjp , .gif , .png"
              type="file"
            />
            {errors.invoice_file && touched.invoice_file ? (
              <FormErrorMessage>{errors.invoice_file}.</FormErrorMessage>
            ) : null}
          </FormControl>
        </div>
      </div>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
        {isEdit ? (
          <Button
            onClick={handleUpdate}
            variant="outline"
            colorScheme="primary"
            transition="ease-in-out 0.5s"
            _hover={{ bgColor: "primary.600", color: "#fff" }}
          >
            Update
          </Button>
        ) : (
          <Button
            type="submit"
            variant="outline"
            colorScheme="primary"
            transition="ease-in-out 0.5s"
            _hover={{ bgColor: "primary.600", color: "#fff" }}
          >
            Save
          </Button>
        )}
      </ModalFooter>
    </form>
  );
}
