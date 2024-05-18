import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  ModalFooter,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { assetsSchema } from "../../../Schima";
import { baseURL, baseUrl } from "../../../utility/baseURL";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../utility/authentication";
import { useFormik } from "formik";
import { blobUrlToFile, months } from "../../../utility/utlity";
import CurrencyList from "currency-list";
import axios from "axios";
import baseAxios from "../../../utility/axiosConfig";
import { getObjects } from "../../../utility/category_brand";


const inputdata = {
    real_estate: "",
    name: "",
    photo: "",
    type: "",
    brand: "",
    model: "",
    description: "",
    quantity: "",
    purchasing_price: "",
    purchasing_currency: "SAR",
    purchasing_date: new Date().toISOString().slice(0, 10),
    floor_name: "",
    room_name: "",
    assert_file: "",
  };

function AssetForm({isEdit,onClose,data,update}) {
  const [realestate, setRealestate] = useState([]);
  const router = useNavigate();
  const toast = useToast();
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currency, setCurrency] = useState(["SAR", "USA"]);

  const { access_token, userType } = getUser();

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  

  


  const {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    handleReset,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: inputdata,
    validationSchema: assetsSchema,
    onSubmit: (values, { setSubmitting }) => {
      baseAxios
        .post(baseUrl.defaults.baseURL + "/assets/", values, {
          headers: headers,
        })
        .then((res) => {
          update(res.data);

          toast({
            title: "Asset Create Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          onClose();
          handleReset();
        })
        .catch((error) => {
          if (error.response.data.non_field_errors) {
            error.response.data.non_field_errors.map((message) => {
              toast({
                title: message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            });
          }
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
    },
  });

  const addValue = (data)=>{
    getObjects("/assert-type/", headers, setTypes);
    getObjects("/assert-brand/", headers, setBrands);
    setValues({
        real_estate:data?.real_estate,
        name: data?.name,
        type: data?.type,
        brand: data?.brand,
        model: data?.model,
        description: data?.description,
        quantity: data?.quantity,
        purchasing_price: data?.purchasing_price,
        purchasing_currency: data?.purchasing_currency,
        purchasing_date: data?.purchasing_date,
        floor_name: data?.floor_name,
        room_name: data?.room_name,
      });

      blobUrlToFile(data?.photo).then((res) => {
        setFieldValue("photo", res);
      });
      blobUrlToFile(data?.assert_file).then((res) => {
        setFieldValue("assert_file", res);
      });
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    baseAxios
      .patch(baseUrl.defaults.baseURL + `/assets/${data?.id}/`, values, {
        headers: headers,
      })
      .then((res) => {
        update(res.data)
        toast({
          title: "update Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
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

  const assetTypeChange = (e)=>{
    setFieldValue("type", e.target.value)
    
    baseAxios
    .get(`${baseURL}/assert-brand/?type=${e.target.value}`, { headers: headers })
    .then((res) => {
      console.log(res.data)
      setBrands(res.data);
    })
    .catch((error) => {
    });
  }

  useEffect(() => {
    // const cur = [];
    // const cr = Object.keys(CurrencyList.getAll().af);
    // cr.map((item) => cur.push({ key: item, value: item }));
    // setCurrency(cur);
    // setFieldValue("type", )
    baseAxios
      .get(`${baseURL}/assert-type/`, { headers: headers })
      .then((res) => {
        setTypes(res.data);
      })
      .catch((error) => {
      });
    baseAxios
      .get(`${baseURL}/realestate/${userType}/`, { headers: headers })
      .then((res) => {
        setRealestate(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

      if(isEdit){
        addValue(data)
      }
  }, []);


  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <FormControl isInvalid={errors.real_estate && touched.real_estate}>
          <FormLabel
            color="secondary.600"
            fontWeight="semibold"
            fontSize="0.9rem"
          >
            Real Estate
          </FormLabel>
          <Select
            placeholder="Real Estate Name"
            name="real_estate"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.real_estate}
          >
            {realestate.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          {errors.real_estate && touched.real_estate ? (
            <FormErrorMessage>{errors.real_estate}</FormErrorMessage>
          ) : null}
        </FormControl>
      </Box>
      <Box mb={2}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
          <FormControl isInvalid={errors.name && touched.name}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Asset name
            </FormLabel>
            <Input
              type="text"
              placeholder="Asset name"
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              value={values.name}
              autoComplete="off"
            />
            {errors.name && touched.name ? (
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isInvalid={errors.photo && touched.photo}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Image
            </FormLabel>
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
        </SimpleGrid>
      </Box>

      <Box mb={2}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
          <FormControl isInvalid={errors.type && touched.type}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Asset Type
            </FormLabel>
            <Select
              placeholder="Asset Type"
              name="type"
              value={values.type}
              onChange={assetTypeChange}
              onBlur={handleBlur}
            >
              {types.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            {errors.type && touched.type ? (
              <FormErrorMessage>{errors.type}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isInvalid={errors.brand && touched.brand}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Asset Brand
            </FormLabel>
            <Select
              placeholder="Asset Brand"
              name="brand"
              value={values.brand}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {brands.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            {errors.brand && touched.brand ? (
              <FormErrorMessage>{errors.brand}</FormErrorMessage>
            ) : null}
          </FormControl>
        </SimpleGrid>
      </Box>

      <Box mb={2}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
          <FormControl isInvalid={errors.model && touched.model}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Asset Model
            </FormLabel>
            <Input
              type="text"
              placeholder="Asset Model"
              onChange={handleChange}
              name="model"
              value={values.model}
              autoComplete="off"
              onBlur={handleBlur}
            />
            {errors.model && touched.model ? (
              <FormErrorMessage>{errors.model}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl isInvalid={errors.description && touched.description}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Asset description
            </FormLabel>
            <Textarea
              type="text"
              placeholder="Asset description"
              onChange={handleChange}
              name="description"
              value={values.description}
              onBlur={handleBlur}
            ></Textarea>
            {errors.description && touched.description ? (
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            ) : null}
          </FormControl>
        </SimpleGrid>
      </Box>

      <Box mb={2}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
          <FormControl isInvalid={errors.quantity && touched.quantity}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Quantity
            </FormLabel>
            <Select
              placeholder="quantity"
              name="quantity"
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {months(10).map((item, i) => (
                <option key={i} value={item.value}>
                  {item.key}
                </option>
              ))}
            </Select>
            {errors.quantity && touched.quantity ? (
              <FormErrorMessage>{errors.quantity}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl
            isInvalid={errors.purchasing_price && touched.purchasing_price}
          >
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              purchasing price
            </FormLabel>
            <Input
              type="number"
              placeholder="purchasing price"
              name="purchasing_price"
              value={values.purchasing_price}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
            {errors.purchasing_price && touched.purchasing_price ? (
              <FormErrorMessage>{errors.purchasing_price}</FormErrorMessage>
            ) : null}
          </FormControl>
        </SimpleGrid>
      </Box>

      <Box mb={2}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
          <FormControl
            isInvalid={
              errors.purchasing_currency && touched.purchasing_currency
            }
          >
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              purchasing currency
            </FormLabel>
            <Select
              placeholder="purchasing currency"
              name="purchasing_currency"
              // value={values.purchasing_currency}
              onChange={handleChange}
              defaultValue={values.purchasing_currency}
              onBlur={handleBlur}
            >
              {currency.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            {errors.purchasing_currency && touched.purchasing_currency ? (
              <FormErrorMessage>{errors.purchasing_currency}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl
            isInvalid={errors.purchasing_date && touched.purchasing_date}
          >
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              purchasing date
            </FormLabel>
            <Input
              type="date"
              onChange={handleChange}
              value={values.purchasing_date}
              name="purchasing_date"
              onBlur={handleBlur}
              min={new Date().toISOString().slice(0, 10)}
            />

            {errors.purchasing_date && touched.purchasing_date ? (
              <FormErrorMessage>{errors.purchasing_date}</FormErrorMessage>
            ) : null}
          </FormControl>
        </SimpleGrid>
      </Box>

      <Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
          <FormControl isInvalid={errors.floor_name && touched.floor_name}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Floor Name or Number
            </FormLabel>
            <Input
              type="text"
              placeholder="Floor Name or Number"
              onChange={handleChange}
              name="floor_name"
              value={values.floor_name}
              autoComplete="off"
              onBlur={handleBlur}
            />
            {errors.floor_name && touched.floor_name ? (
              <FormErrorMessage>{errors.floor_name}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isInvalid={errors.room_name && touched.room_name}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Room Name or Number
            </FormLabel>
            <Input
              type="text"
              placeholder="Room Name or Number"
              onChange={handleChange}
              name="room_name"
              value={values.room_name}
              autoComplete="off"
              onBlur={handleBlur}
            />
            {errors.room_name && touched.room_name ? (
              <FormErrorMessage>{errors.room_name}</FormErrorMessage>
            ) : null}
          </FormControl>
        </SimpleGrid>
      </Box>

      <Box>
        <FormControl isInvalid={errors.assert_file && touched.assert_file}>
          <FormLabel>Asset Invoice</FormLabel>
          <Input
            placeholder="Upload Related Invoice"
            name="assert_file"
            onChange={(event) => {
              setFieldValue("assert_file", event.target.files[0]);
            }}
            accept=".jpg , .jpeg , .jfif , .pjpeg , .pjp , .gif , .png"
            type="file"
            onBlur={handleBlur}
          />
          {errors.assert_file && touched.assert_file ? (
            <FormErrorMessage>{errors.assert_file}.</FormErrorMessage>
          ) : null}
        </FormControl>
      </Box>

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

export default AssetForm;
