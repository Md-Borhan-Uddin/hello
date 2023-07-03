import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import CustomModal from "../../../components/UserEditModal";
import { useFormik } from "formik";
import { countrySchima, citySchima } from "../../../Schima";
import axios from "axios";
import { baseURL, baseUrl } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import { useNavigate } from "react-router-dom";
import { deleteItem, editItem, getObjects } from "../../../utility/country_city";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";



const countrydata = {
  name: "",
};

const citydata = {
    name: '',
    country_id: ""
}

function countryCity() {
  const [countries, setCountries] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [cities, setCities] = useState([]);
  const [id,setId] = useState()
  const router = useNavigate();
  const toast = useToast();
  const [customerror, setcustomerror] = useState({});
  const {
    isOpen: countryIsOpen,
    onClose: countryOnClose,
    onOpen: countryOnOpen,
  } = useDisclosure();
  const {
    isOpen: cityIsOpen,
    onClose: cityOnClose,
    onOpen: cityOnOpen,
  } = useDisclosure();
  const { access_token } = getUser();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  const {
    values: countriesValues,
    errors: countriesErrors,
    setValues: countriesSetValues,
    handleChange: countryHandleChange,
    handleSubmit: countryHandleSubmit,
    handleReset: countryHandleReset,
    touched: countryTouched,
  } = useFormik({
    initialValues: countrydata,
    validationSchema: countrySchima,
    onSubmit: (values, { setSubmitting }) => {
      
      axios
        .post(baseURL + "/country/", values, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          setCountries([...countries, res.data]);

          toast({
            title: "countries Add Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error);
          setcustomerror(error.response.data)
          if(error.response.data.non_field_errors){
            error.response.data.non_field_errors.map((message)=>{

              toast({
                title: message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            })
          }
          if (error.response.status == 401) {
            toast({
              title: "You are not Login Login First",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
            router("/account/login");
          }
        });
        countryHandleReset()
        countryOnClose();

      //   onClose();
      //   window.location.reload();
    },
  });

  const {
    values: citiesValues,
    errors: citiesErrors,
    setValues: citySetValues,
    handleChange: cityHandleChange,
    handleSubmit: cityHandleSubmit,
    handleReset: cityHandleReset,
    touched: cityTouched,
  } = useFormik({
    initialValues: citydata,
    validationSchema: citySchima,
    onSubmit: (citiesValues, { setSubmitting }) => {
      console.log(citiesValues)
      axios
        .post(baseURL+ "/city/", citiesValues, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          setCities([...cities, res.data]);
          
        })
        .catch((error) => {
          console.log(error);
          setcustomerror(error.response.data)
          if(error.response.data.non_field_errors){
            error.response.data.non_field_errors.map((message)=>{

              toast({
                title: message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            })
          }
          if (error.response.status == 401) {
            toast({
              title: "You are not Login Login First",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
            router.push("/account/login");
          }
          // countriesHandleReset()
          // countriesOnClose();
        });
        cityHandleReset()
        cityOnClose();
    },
  });

  useEffect(() => {
    getObjects("/country/", headers, setCountries);
    getObjects("/city/", headers, setCities);
  }, []);

  const countryEdit = (e) => {
    setIsEdit(true);
    const { value } = e.target;
    setId(value)
    const cat = countries.filter((e) => e.id == value);
    countryOnOpen();
    countriesSetValues({
      name: cat[0]?.name,
    });
  };

  const citiEdit = (e) => {
    setIsEdit(true);
    const { value } = e.target;
    setId(value)
    const cat = cities.filter((e) => e.id == value);
    console.log(cat)
    cityOnOpen();
    citySetValues({
      name: cat[0]?.name,
      country_id: cat[0]?.country.id,
    });
  };

  const cityUpdate = (e) => {
    e.preventDefault();
    // const { value } = citiesid.current;
    const res = editItem(
      "/city/",
      headers,
      id,
      citiesValues,
      citySetValues,
      cities,
      toast
    );
    
    cityOnClose();
  };

  const countryUpdate = (e) => {
    e.preventDefault();
    // const { value } = countriesId.current;
    const res = editItem(
      "/country/",
      headers,
      id,
      countriesValues,
      countriesSetValues,
      countries,
      toast
    );
    
    countryOnClose();
  };

  const countryDelete = (e) => {
    const { value } = e.target;

    const res = deleteItem(
      "/country/",
      headers,
      value,
      setCountries,
      countries,
      toast
    );
    setCities(cities)
    
  };

  const cityDelete = (e) => {
    const { value } = e.target;

    const res = deleteItem("/city/", headers, value, setCities, cities,toast);
    
  };
  return (
    <>
      <Flex gap={3} flexWrap={{base:'wrap',md:'nowrap'}}>
        <Box w={{base:'100%',md:'50%'}} pl={'10px'}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0.5rem"}
          >
            <Text as={"h2"} fontSize={"1.3rem"} textAlign={"center"}>
              countries List
            </Text>
            <Button
              onClick={() => {
                countryHandleReset();
                setIsEdit(false);
                countryOnOpen();
              }}
              backgroundColor={"rgb(34,220,118)"}
              _hover={{ backgroundColor: "rgb(58, 187, 116)" }}
            >
              Add country
            </Button>
          </Flex>
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {countries.map((item, i) => {
                return (
                  <tr
                    className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">
                      <HStack alignItems={"center"} justifyContent={"center"}>
                        <Button
                          aria-label="editbtn"
                          onClick={countryEdit}
                          colorScheme="teal"
                          value={item.id}
                        >
                          Edit
                        </Button>

                        <Button
                          aria-label="deletebtn"
                          onClick={countryDelete}
                          colorScheme="red"
                          value={item.id}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
        <Box w={{base:'100%',md:'50%'}} pr={'10px'}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0.5rem"}
          >
            <Text as={"h2"} fontSize={"1.3rem"} textAlign={"center"}>
              Cities List
            </Text>
            <Button
              onClick={()=>{cityHandleReset();setIsEdit(false); cityOnOpen()}}
              backgroundColor={"rgb(34,220,118)"}
              _hover={{ backgroundColor: "rgb(58, 187, 116)" }}
            >
              Add City
            </Button>
          </Flex>
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  country
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cities.map((item, i) => {
                return (
                  <tr
                    className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={i}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      {item.country.name}
                    </td>
                    <td className="px-6 py-4">
                      <HStack alignItems={"center"} justifyContent={"center"}>
                        <Button
                          aria-label="editbtn"
                          onClick={citiEdit}
                          value={item.id}
                          colorScheme="teal"
                        >
                          Edit
                        </Button>

                        <Button
                          aria-label="deletebtn"
                          onClick={cityDelete}
                          value={item.id}
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                      </HStack>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Flex>

      {/* countries modal */}
      <CustomModal
        isOpen={countryIsOpen}
        onClose={countryOnClose}
        closeOnOverlayClick={false}
        title="Edit User"
        isFooter={true}
        cancelBtnLabel="Cancle"
      >
        <form
          className="space-y-3 md:space-y-4"
          onSubmit={countryHandleSubmit}
        >
          <FormControl isInvalid={countriesErrors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="countries Name"
              value={countriesValues.name}
              onChange={countryHandleChange}
            />
            {countriesErrors.name && countryTouched.name ? (
              <FormErrorMessage>{countriesErrors.name}.</FormErrorMessage>
            ) : null}
            {customerror.name ? (
              <p className="text-red-600">{customerror.name.message}.</p>
            ) : null}
          </FormControl>
          {isEdit ? (
            <button
              className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={countryUpdate}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              // disabled={isSubmitting}
            >
              Save
            </button>
          )}
        </form>
      </CustomModal>

      {/* City modal */}
      <CustomModal
        isOpen={cityIsOpen}
        onClose={cityOnClose}
        closeOnOverlayClick={false}
        title="Edit City"
        isFooter={true}
        cancelBtnLabel="Cancle"
      >
        <form className="space-y-3 md:space-y-4" onSubmit={cityHandleSubmit}>
            <FormControl isInvalid={citiesErrors.country_id}>
                <Select placeholder='Select Country' name="country_id" value={citiesValues.country_id} onChange={cityHandleChange}>
                    {countries.map((item)=><option key={item.id} value={item.id}>{item.name}</option>)}
                    
                </Select>
                {citiesErrors.country && citiesTouched.country ? (
                <FormErrorMessage>{citiesErrors.country}.</FormErrorMessage>
                ) : null}
                {customerror.country ? (
                <p className="text-red-600">{customerror.country.message}.</p>
                ) : null}
          </FormControl>
          <FormControl isInvalid={citiesErrors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="cities Name"
              value={citiesValues.name}
              onChange={cityHandleChange}
            />
            {citiesErrors.name && cityTouched.name ? (
              <FormErrorMessage>{citiesErrors.name}.</FormErrorMessage>
            ) : null}
            {customerror.name ? (
              <p className="text-red-600">{customerror.name.message}.</p>
            ) : null}
          </FormControl>
          
          {isEdit ? (
            <button
              className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={cityUpdate}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              // disabled={isSubmitting}
            >
              Save
            </button>
          )}
        </form>
      </CustomModal>
    </>
  );
}


export default RequireAuth(countryCity)
