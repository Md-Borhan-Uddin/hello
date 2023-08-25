import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getUser } from "../../../utility/authentication";
import { useNavigate } from "react-router-dom";
import {
  deleteItem,
  editItem,
  getObjects,
} from "../../../utility/country_city";

import RequireAuth from "../../../components/auth/TokenExpaireCheck";
const CustomModal = React.lazy(()=>import("../../../components/UserEditModal"));
const CountryForm = React.lazy(()=>import("../../../components/form/countryForm"));
const CityForm = React.lazy(()=>import("../../../components/form/cityForm"));
const DeleteButton = React.lazy(()=>import("../../../components/deleteButton"));




function countryCity() {
  
  
  const [country, setCountry] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [city, setCity] = useState([]);
  const [cities, setCities] = useState([]);
  const [id, setId] = useState();
  const router = useNavigate();
  const toast = useToast();
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

  
  

  useEffect(() => {
    getObjects("/country/", headers, setCountries);
    getObjects("/city/", headers, setCities);
  }, []);

  

  const citiEdit = (e) => {
    setIsEdit(true);
    const { value } = e.target;
    setId(value);
    const cat = cities.filter((e) => e.id == value);
    
    setCity(cat);
    cityOnOpen();
  };

  

  const countryEdit = (e) => {
    setIsEdit(true);
    const { value } = e.target;
    setId(value);
    const cat = countries.filter((e) => e.id == value);
    setCountry(cat)
    countryOnOpen();
    
  };

  

  

  const countryDelete = (id) => {
    

    const res = deleteItem(
      "/country/",
      headers,
      id,
      setCountries,
      countries,
      toast
    );
    const obj = cities.filter((item) => item.country.id != id);
    setCities(obj);
  };

  const cityDelete = (id) => {
    

    const res = deleteItem(
      `/city/delete/`,
      headers,
      id,
      setCities,
      cities,
      toast
    );
  };

  const cauntryStatus = (e) => {
    const { value, checked } = e.target;
    const res = editItem(
      "/country/",
      headers,
      value,
      { is_active: checked },
      setCountries,
      countries,
      toast
    );
  };

  const cityStatus = (e) => {
    const { value, checked } = e.target;
    const res = editItem(
      "/city/edit/",
      headers,
      value,
      { is_active: checked },
      setCities,
      cities,
      toast
    );
  };

  return (
    <>
      <Flex gap={3} flexWrap={{ base: "wrap", md: "nowrap" }} overflowX={'auto'}>
        <Box w={{ base: "100%", md: "50%" }} pl={"10px"}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0.5rem"}
          >
            <Text as={"h2"} fontSize={"1.3rem"} textAlign={"center"}>
              Countries List
            </Text>
            <Button
              onClick={() => {
                setIsEdit(false);
                countryOnOpen();
              }}
              backgroundColor={"rgb(34,220,118)"}
              _hover={{ backgroundColor: "rgb(58, 187, 116)" }}
            >
              Add Country
            </Button>
          </Flex>
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
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
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center">
                      <Switch
                        value={item.id}
                        onChange={cauntryStatus}
                        isChecked={item.is_active}
                      />
                    </td>
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
                        <DeleteButton handleDelete={countryDelete} id={item.id} />
                      </HStack>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
        <Box w={{ base: "100%", md: "50%" }} pr={"10px"}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0.5rem"}
          >
            <Text as={"h2"} fontSize={"1.3rem"} textAlign={"center"}>
              Cities List
            </Text>
            <Button
              onClick={() => {
                setIsEdit(false);
                cityOnOpen();
              }}
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
                  Status
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
                    <td className="px-6 py-4">{item.country.name}</td>
                    <td className="px-6 py-4 flex items-center justify-center">
                      <Switch
                        value={item.id}
                        onChange={cityStatus}
                        isChecked={item.is_active}
                      />
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
                        <DeleteButton handleDelete={cityDelete} id={item.id} />
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
        title="Country Form"
        isFooter={true}
        cancelBtnLabel="Cancel"
      >
        <CountryForm setCountries={setCountries} countries={countries} country={country} countryOnClose={countryOnClose} isEdit={isEdit} id={id}/>
      </CustomModal>

      {/* City modal */}
      <CustomModal
        isOpen={cityIsOpen}
        onClose={cityOnClose}
        closeOnOverlayClick={false}
        title="Edit City"
        isFooter={true}
        cancelBtnLabel="Cancel"
      >
        <CityForm id={id} city={city} countries={countries} isEdit={isEdit} setCities={setCities} cities={cities} cityOnClose={cityOnClose}/>
      </CustomModal>


      




    </>
  );
}

export default RequireAuth(countryCity);
