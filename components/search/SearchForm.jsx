import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getUser } from "../../utility/authentication";
import { getObjects } from "../../utility/country_city";
import axios from "axios";
import { baseURL } from "../../utility/baseURL";
import { Link } from "react-router-dom";

export default function SearchForm({ onClose }) {
  const [searchType, setSearchType] = useState("");
  const [country, setCountry] = useState([]);
  const [realestateType, setRealestateType] = useState([]);
  const [city, setCity] = useState([]);
  const { access_token } = getUser();
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  useEffect(() => {
    getObjects("/country/?is_active=True", headers, setCountry);
    getObjects("/real-estate-type/", headers, setRealestateType);
  }, []);

  const InputData =
    searchType === "request"
      ? {
          id: "",
          real_estate__type: "",
          create: "",
          username: "",
          first_name: "",
          last_name: "",
          assignee: "",
          update: "",
        }
      : {
          id: "",
          name: "",
          user__create: "",
          country: "",
          city: "",
          type: "",
          number_of_floors: "",
          user__first_name: "",
          user__last_name: "",
          user__username: "",
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
  // console.log('values', values);
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
                    value={values.real_estate__type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="real_estate__type"
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
                    name="create"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.create}
                    max={new Date().toISOString().slice(0, 10)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Initiator Username</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Initiator Firstname</FormLabel>
                  <Input
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Initiator LastName</FormLabel>
                  <Input
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
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
                    name="update"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.update}
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
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Creation Profile Date</FormLabel>
                  <Input
                    type="date"
                    name="user__create"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.user__create}
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
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="type"
                  >
                    {realestateType.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.key}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Number of Floors</FormLabel>
                  <Input
                    type="number"
                    name="number_of_floors"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number_of_floors}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Owner FirstName</FormLabel>
                  <Input
                    type="text"
                    name="user__first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.user__first_name}
                  />
                </FormControl>
              </Flex>
              <Flex gap={3}>
                <FormControl>
                  <FormLabel>Owner LastName</FormLabel>
                  <Input
                    type="text"
                    name="user__last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.user__last_name}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Owner Username</FormLabel>
                  <Input
                    type="text"
                    name="user__username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.user__username}
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
            <Button colorScheme="primary" mr={3} type="submit" onClick={onClose}>
             <Link to={'/request-search'} state={{data:InputData,type:searchType}}> Submit</Link>
            </Button>
          </ModalFooter>}
        </form>
      </Box>
    </Box>
  );
}
