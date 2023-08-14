import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Select,
  Input,
  useBreakpointValue,
  Button,
  useBreakpoint,
  useDisclosure,
  Stack,
  ModalFooter,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getUser } from "../../utility/authentication";
import { getObjects } from "../../utility/country_city";
import axios from "axios";
import { baseURL } from "../../utility/baseURL";

export default function SearchForm({ onClose }) {
  const [searchType, setSearchType] = useState("");
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const { access_token } = getUser();
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  useEffect(() => {
    getObjects("/country/?is_active=True", headers, setCountry);
  }, []);

  const InputData =
    searchType === "request"
      ? {
          id: "",
          requestType: "",
          submissionDate: "",
          initiatorUserName: "",
          initiatorFirstName: "",
          initiatorLastName: "",
          assignee: "",
          lastActionDate: "",
        }
      : {
          id: "",
          realEstateName: "",
          creationProfileDate: "",
          country: "",
          city: "",
          realEstateType: "",
          numberofFloors: "",
          ownerFirstName: "",
          ownerLastName: "",
          ownerUserName: "",
        };

  const {
    values,
    handleBlur,
    setFieldValue,
    handleChange,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: InputData,
    onSubmit: () => {
      console.log(values);
    },
  });
  const handleCountry = (e) => {
    handleChange(e);
    const { value } = e.target;
    setFieldValue("country", value);

    axios
      .get(`${baseURL}/city/${value}/?is_active=True`, { headers: headers })
      .then((res) => {
        let c = [];
        res.data.map((item) => c.push({ key: item.name, value: item.id }));
        setCity(c);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box mb={20}>
      <Select
        placeholder="Select Type"
        name="searchType"
        value={searchType}
        onChange={(e) => {
          setSearchType(e.target.value);
          handleReset();
        }}
      >
        <option value="request">Request</option>
        <option value="real-estate">Real Estate</option>
      </Select>
      <Box mt={6}>
        <form onSubmit={handleSubmit}>
          {searchType === "request" && (
            <>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>ID</FormLabel>
                  <Input
                    type="number"
                    name="id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.id}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Request Type</FormLabel>
                  <Select
                    placeholder="Select Type"
                    value={values.requestType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="requestType"
                  >
                    <option value="Effectiveness Report">
                      Effectiveness Report
                    </option>
                  </Select>
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Submission Date</FormLabel>
                  <Input
                    type="date"
                    name="submissionDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.submissionDate}
                    max={new Date().toISOString().slice(0, 10)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Initiator Username</FormLabel>
                  <Input
                    type="text"
                    name="initiatorUserName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.initiatorUserName}
                  />
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Initiator Firstname</FormLabel>
                  <Input
                    type="text"
                    name="initiatorFirstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.initiatorFirstName}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Initiator LastName</FormLabel>
                  <Input
                    type="text"
                    name="initiatorLastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.initiatorLastName}
                  />
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Assignee</FormLabel>
                  <Input
                    type="text"
                    name="assignee"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.assignee}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Last Action Date</FormLabel>
                  <Input
                    type="date"
                    name="lastActionDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastActionDate}
                    max={new Date().toISOString().slice(0, 10)}
                  />
                </FormControl>
              </Flex>
            </>
          )}
          {searchType === "real-estate" && (
            <>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>ID</FormLabel>
                  <Input
                    type="number"
                    name="id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.id}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Real Estate Name</FormLabel>
                  <Input
                    type="text"
                    name="realEstateName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.realEstateName}
                  />
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Creation Profile Date</FormLabel>
                  <Input
                    type="date"
                    name="creationProfileDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.creationProfileDate}
                    max={new Date().toISOString().slice(0, 10)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select
                    placeholder="Select country"
                    value={values.country}
                    onChange={handleCountry}
                    onBlur={handleBlur}
                    name="country"
                  >
                    {country.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Select
                    placeholder="Select City"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="city"
                  >
                    {city.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.key}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Real EstateT ype</FormLabel>
                  <Select
                    placeholder="Real EstateT ype"
                    value={values.realEstateType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="realEstateType"
                  >
                    <option value="realEstateType1">realEstateType1</option>
                    <option value="realEstateType2">realEstateType2</option>
                  </Select>
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Number of Floors</FormLabel>
                  <Input
                    type="number"
                    name="numberofFloors"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.numberofFloors}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Owner FirstName</FormLabel>
                  <Input
                    type="text"
                    name="ownerFirstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ownerFirstName}
                  />
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Owner LastName</FormLabel>
                  <Input
                    type="text"
                    name="ownerLastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ownerLastName}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Owner Username</FormLabel>
                  <Input
                    type="text"
                    name="ownerUserName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ownerUserName}
                  />
                </FormControl>
              </Flex>
            </>
          )}
          {searchType&&<ModalFooter>
            <Button
              colorScheme="primary"
              variant={"outline"}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button colorScheme="primary" mr={3} type="submit">
              Submit
            </Button>
          </ModalFooter>}
        </form>
      </Box>
    </Box>
  );
}
