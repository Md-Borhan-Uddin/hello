import { propertyAddSchima } from "../../../Schima";
import { baseURL } from "../../../utility/baseURL";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CurrencyList from "currency-list";
import axios from "axios";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  Select,
  position,
} from "@chakra-ui/react";
import { getUser } from "../../../utility/authentication";
import { useNavigate, Link } from "react-router-dom";
import { getObjects } from "../../../utility/property";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import useGeolocation from 'react-hook-geolocation'







const AddState = () => {
  const { access_token, userType } = getUser();
  const [uType, setUType] = useState("");
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [type, setType] = useState([]);
  const [user, setUser] = useState([]);
  const [location, setLocation] = useState([])
  const router = useNavigate();
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  const geolocation = useGeolocation()

  useEffect(() => {
    
    setLocation([geolocation.latitude,geolocation.longitude])
    console.log('location',location)
    let c = [{ key: "Please select", value: "" }];
    getObjects("/country/", headers, setCountry);
    // getObjects("/city/", headers, setCity);
    // setCountry(c)
    const cur = [];
    const cr = Object.keys(CurrencyList.getAll().af);
    cr.map((item) => cur.push({ key: item, value: item }));
    setCurrency(cur);
    setUType(userType);

    fetch(baseURL + "/real-estate-type/")
      .then((res) => res.json())
      .then((data) => {
        let type = [];
        data.map((item) =>
          type.push({ key: item.name, value: item.id.toString() })
        );
        setType(type);
      });

    if (uType === "Admin") {
      fetch(baseURL + "/all-user/")
        .then((res) => res.json())
        .then((data) => {
          let u = [];
          data.map((item) =>
            u.push({ key: item.username, value: item.id.toString() })
          );
          setUser(u);
        });
    }
  }, [geolocation]);

  const inputField = {
    name: "",
    photo: "",
    country: "",
    city: "",
    type_id: "",
    property_age_years: "",
    property_age_months: "",
    rented: "",
    owner: "",
    purchasing_cost: "",
    cost_currency: "",
    cost_date: "",
    purpose: "commercial",
    number_of_floors: "",
    invoice_file: "",
    user_id: "",
    location:[]
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
    setValues
  } = useFormik({
    initialValues: inputField,
    validationSchema: propertyAddSchima,
    onSubmit: (values) => {
      console.log('submit location', location)
      values.location = JSON.stringify(location)
      setFieldValue('location',location)
      if (!values.invoice_file) {
        delete values.invoice_file;
      }
      if (values.rented === "rented") {
        values.rented = true;
      } else {
        values.rented = false;
      }
      if (values.owner === "owner") {
        values.owner = true;
      } else {
        values.owner = false;
      }

      if (!access_token) {
        setErrors({ message: "You are not Login. First Login Then Create" });
        window.scrollTo(0, 0);
        return;
      }
      console.log(values)
      axios
        .post(baseURL + `/realestate/${userType}/`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + String(access_token),
          },
        })
        .then((res) => {
          console.log("data", res);
          // setUser(res.data)
          router(`/property-list/${userType}`);
        })
        .catch((error) => {
          console.log(error.response);
          setErrors(error.response.data);
          if (error.response.status == 401) {
            setErrors({ message: error.response.data.messages[0].message });
          }
          window.scrollTo(0, 0);
          setValues({
            name: values.name,
            photo: values.photo,
            country: values.country,
            city: values.city,
            type_id: values.type_id,
            property_age_years: values.property_age_years,
            property_age_months: values.property_age_months,
            rented: values.rented,
            owner: values.owner,
            purchasing_cost: values.purchasing_cost,
            cost_currency: values.cost_currency,
            cost_date: values.cost_date,
            purpose: values.purpose,
            number_of_floors: values.number_of_floors,
            invoice_file: values.invoice_file,
            user_id: values.user_id,
            location:values.location
          })
        });
    },
  });

  const handleCountry = (e) => {
    handleChange(e);
    const { value } = e.target;
    setFieldValue("country", value);
    // // const state = country_state.find((val)=>val.country_name==value).states
    // let st = [...city]
    // // state.map(item=>st.push({key:item.state_name,value:item.state_name}))
    // setCity(st)

    axios
      .get(`${baseURL}/city/${value}/`, { headers: headers })
      .then((res) => {
        console.log(res);
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

  const style = {
    border: "1px solid silver",
    padding: "5px",
    borderRadius: "5px",
    width: "100%",
  };

  const [error, setErrors] = useState([]);

  const options = [
    { key: "Please select", value: "" },
    { key: "Bangladesh", value: "Bangladesh" },
    { key: "India", value: "India" },
    { key: "Afganishan", value: "Afganishan" },
  ];

  return (
    <div className="py-2 px-4 flex justify-center">
      <div className="add-state-body w-3/4 mt-2 px-4 pb-3">
        <h2 className="text-center font-bold text-2xl text-gray-500 mt-2">
          Add Real Estate{" "}
        </h2>
        <div className="p-4 shadow-md rounded-md">
          {error.message ? (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{error.message}.</AlertDescription>
            </Alert>
          ) : null}

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
              <div
                className={uType === "Admin" ? "md:w-1/2 flex" : "w-full flex"}
              >
                <div className="md:w-1/2 md:ml-2">
                  <FormControl
                    isInvalid={
                      errors.property_age_years && touched.property_age_years
                    }
                  >
                    <FormLabel>Age of the Property (Years)</FormLabel>
                    <Input
                      placeholder="Age of the Property (Years) "
                      type="number"
                      name="property_age_years"
                      value={values.property_age_years}
                      onChange={handleChange}
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
                    {errors.property_age_months &&
                    touched.property_age_months ? (
                      <FormErrorMessage>
                        {errors.property_age_months}.
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                </div>
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
                <FormControl isInvalid={errors.rented && touched.rented}>
                  <Radio
                    name="rented"
                    borderColor={"gray.400"}
                    onChange={handleChange}
                    value="rented"
                  >
                    Are You the Renter
                  </Radio>
                  {errors.rented && touched.rented ? (
                    <FormErrorMessage>{errors.rented}.</FormErrorMessage>
                  ) : null}
                </FormControl>
              </div>
              <div className="md:w-1/2 md:ml-2">
                <FormControl isInvalid={errors.owner && touched.owner}>
                  <Radio
                    name="owner"
                    borderColor={"gray.400"}
                    onChange={handleChange}
                    value="owner"
                  >
                    Are You the Owner
                  </Radio>
                  {errors.owner && touched.owner ? (
                    <FormErrorMessage>{errors.owner}.</FormErrorMessage>
                  ) : null}
                </FormControl>
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="md:w-1/2 md:ml-2">
                <FormControl
                  isInvalid={
                    errors.purchasing_cost && touched.purchasing_cost
                  }
                >
                  <FormLabel>Purchasing / Rent Price or Cost</FormLabel>
                  <Input
                    placeholder="Purchasing / Rent Price or Cost"
                    type="number"
                    name="purchasing_cost"
                    value={values.purchasing_cost}
                    onChange={handleChange}
                  />
                  {errors.purchasing_cost && touched.purchasing_cost ? (
                    <FormErrorMessage>
                      {errors.purchasing_cost}.
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
                
              </div>
              <div className="md:w-1/2 md:ml-2">

              <FormControl isInvalid={errors.cost_currency && touched.cost_currency}>
                    <FormLabel>Purchasing / Rent Currency"</FormLabel>
                    <Select
                      placeholder="Select Currency"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="cost_currency"
                    >
                      {currency.map((item, i) => (
                        <option key={i} value={item.value}>
                          {item.key}
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

              <FormControl
                  isInvalid={
                    errors.cost_date && touched.cost_date
                  }
                >
                  <FormLabel>Purchasing / Rent Date</FormLabel>
                  <Input
                    placeholder="Purchasing / Rent Date"
                    type="date"
                    name="cost_date"
                    value={values.cost_date}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 10)}
                  />
                  {errors.cost_date && touched.cost_date ? (
                    <FormErrorMessage>
                      {errors.cost_date}.
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
                
              </div>
              <div className="md:w-1/2 md:ml-2 mt-4">

              <FormControl isInvalid={errors.purpose && touched.purpose}>
                  <Radio
                    name="purpose"
                    borderColor={"gray.400"}
                    onChange={handleChange}
                    value="purpose"
                  >
                    This is Commercial Property
                  </Radio>
                  {errors.purpose && touched.purpose ? (
                    <FormErrorMessage>{errors.purpose}.</FormErrorMessage>
                  ) : null}
                </FormControl>
                
              </div>
            </div>
            <div className="md:flex justify-between">
              <div className="md:w-1/2">
              <FormControl
                  isInvalid={
                    errors.number_of_floors && touched.number_of_floors
                  }
                >
                  <FormLabel>Number of Floors</FormLabel>
                  <Input
                    placeholder="Number of Floors"
                    type="text"
                    name="number_of_floors"
                    value={values.number_of_floors}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 10)}
                  />
                  {errors.number_of_floors && touched.number_of_floors ? (
                    <FormErrorMessage>
                      {errors.number_of_floors}.
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </div>
              <div className="md:w-1/2 ml-2">
              <FormControl isInvalid={errors.invoice_file && touched.invoice_file}>
                  <FormLabel>Related Invoice</FormLabel>
                  <Input
                    placeholder="Upload Related Invoice"
                    name="invoice_file"
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

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="text-white w-1/2 bg-[rgb(34,220,118)] hover:bg-[rgb(34,220,118)]  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[rgb(34,220,118)] dark:hover:bg-[rgb(34,220,118)]"
              >
                Save
              </button>

              <button
                className="text-white w-1/2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={handleReset}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequireAuth(AddState);
