import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Spacer,
  useDisclosure,
  useToast,
  Divider,
  Flex,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Icon,
} from "@chakra-ui/react";
import { FcOk, FcDisapprove } from "react-icons/fc";
import { useFormik } from "formik";
import {
  assetsSchema,
} from "../../../Schima";
import axios from "axios";
import CurrencyList from "currency-list";
import { baseURL, baseUrl } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import { useNavigate } from "react-router-dom";
import { blobUrlToFile, months } from "../../../utility/utlity";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
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
  purchasing_currency: "",
  purchasing_date: new Date().toISOString().slice(0, 10),
  floor_name: "",
  room_name: "",
  assert_file: "",
};

function Assets() {
  const [isEdit, setIsEdit] = useState(false);
  const [assets, setAssets] = useState([]);
  const [realestate, setRealestate] = useState([]);
  const [id, setId] = useState();
  const router = useNavigate();
  const toast = useToast();
  const [customerror, setcustomerror] = useState({});
  const [types, setTypes] = useState([])
  const [brands, setBrands] = useState([])
  const [currency, setCurrency] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { access_token, userType } = getUser();

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  const getAssets = async (id = null) => {
    let url = baseUrl.defaults.baseURL + "/assets/";
    if (id) {
      url = baseUrl.defaults.baseURL + `/assets/${id}/`;
    }
    const res = await fetch(url, { headers: headers })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });

    return res;
  };

  useEffect(() => {
    
    const cur = [];
    const cr = Object.keys(CurrencyList.getAll().af);
    cr.map((item) => cur.push({ key: item, value: item }));
    setCurrency(cur);
    axios
      .get(baseURL + "/assets/", { headers: headers })
      .then((res) => {
        setAssets(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${baseURL}/realestate/${userType}/`, { headers: headers })
      .then((res) => {
        setRealestate(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        console.log(values)
      axios
        .post(baseUrl.defaults.baseURL + "/assets/", values, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          setAssets([...assets,res.data]);

          toast({
            title: "Package create successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          onClose();
          handleReset();
        })
        .catch((error) => {
          console.log(error);
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

  const handleEdit = (e) => {
    getObjects("/assert-type/", headers, setTypes);
    getObjects("/assert-brand/", headers, setBrands);
    setIsEdit(true);
    const { value } = e.target;
    setId(value);
    axios
      .get(baseUrl.defaults.baseURL + `/assets/${value}/`, values, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        onOpen();
        setValues({
          real_estate: res.data?.real_estate,
          name: res.data?.name,
          type: res.data?.type,
          brand: res.data?.brand,
          model: res.data?.model,
          description: res.data?.description,
          quantity: res.data?.quantity,
          purchasing_price: res.data?.purchasing_price,
          purchasing_currency: res.data?.purchasing_currency,
          purchasing_date: res.data?.purchasing_date,
          floor_name: res.data?.floor_name,
          room_name: res.data?.room_name,
          
        });
        blobUrlToFile(res.data?.photo).then(res=>{
            setFieldValue('photo',res)
          })
          blobUrlToFile(res.data?.assert_file).then(res=>{
            setFieldValue('assert_file',res)
          })
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
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(baseUrl.defaults.baseURL + `/assets/${id}/`, values, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        getAssets().then((res) => setAssets(res));
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

  const handleDelete = (e) => {
    const { value } = e.target;

    axios
      .delete(baseUrl.defaults.baseURL + `/assets/${value}/`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        getAssets().then((res) => setAssets(res));
        toast({
          title: "Delete Successfully",
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
  };

  return (
    <>
      <Box py={12} px={4}>
        <HStack spacing={2} textAlign="center" mb="1rem">
          <Heading as="h1" fontSize="4xl">
            All Assets
          </Heading>
          <Spacer />
          <Button
            colorScheme="primary"
            onClick={() => {
              handleReset();
              setIsEdit(false);
              onOpen();
              getObjects("/assert-type/", headers, setTypes);
                getObjects("/assert-brand/", headers, setBrands);
            }}
          >
            Add Asset
          </Button>
        </HStack>
        <Box>
          <TableContainer>
            <Table variant="simple" textAlign={"center"}>
              <Thead bg={"gray.200"}>
                <Tr>
                  <Th>Name</Th>
                  <Th>Duration(Date/Month)</Th>
                  <Th>Free/Active</Th>
                  <Th>Price</Th>
                  <Th textAlign={"center"}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td>
                        {item.duration_date}/{item.duration_month}
                      </Td>
                      <Td>
                        <Flex>
                          {item.is_free ? (
                            <Icon as={FcOk} />
                          ) : (
                            <Icon as={FcDisapprove} />
                          )}
                          <Divider
                            borderColor="gray.600"
                            orientation="vartical"
                            width="2px"
                            margin="2px"
                            borderTopWidth="20px"
                            size="3px"
                          />
                          {item.is_active ? (
                            <Icon as={FcOk} />
                          ) : (
                            <Icon as={FcDisapprove} />
                          )}
                        </Flex>
                      </Td>
                      <Td>{item.default_price}</Td>
                      <Td>
                        <HStack alignItems={"center"} justifyContent={"center"}>
                          <Button
                            aria-label="editbtn"
                            onClick={handleEdit}
                            value={item.id}
                            colorScheme="teal"
                          >
                            Edit
                          </Button>

                          <Button
                            aria-label="deletebtn"
                            onClick={handleDelete}
                            value={item.id}
                            colorScheme="red"
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Package Add modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"70%"}>
          {isEdit ? (
            <ModalHeader>Edit Asset</ModalHeader>
          ) : (
            <ModalHeader>Add Asset</ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <FormControl
                  isInvalid={errors.real_estate && touched.real_estate}
                >
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
                      name="name"
                      value={values.name}
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
                      onChange={handleChange}
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
                    />
                    {errors.model && touched.model ? (
                      <FormErrorMessage>{errors.model}</FormErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl
                    isInvalid={errors.description && touched.description}
                  >
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
                  <FormControl isInvalid={errors.purchasing_price && touched.purchasing_price}>
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
                    
                      
                    />
                    {errors.purchasing_price && touched.purchasing_price ? (
                      <FormErrorMessage>{errors.purchasing_price}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Box mb={2}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                <FormControl isInvalid={errors.purchasing_currency && touched.purchasing_currency}>
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
                      value={values.purchasing_currency}
                      onChange={handleChange}
                    >
                      {currency.map((item, i) => (
                        <option key={i} value={item.value}>
                          {item.key}
                        </option>
                      ))}
                    </Select>
                    {errors.purchasing_currency && touched.purchasing_currency ? (
                      <FormErrorMessage>{errors.purchasing_currency}</FormErrorMessage>
                    ) : null}
                  </FormControl>

                  <FormControl
                    isInvalid={
                      errors.purchasing_date &&
                      touched.purchasing_date
                    }
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
                      min={new Date().toISOString().slice(0, 10)}
                      
                    />
                     
                    {errors.purchasing_date &&
                    touched.purchasing_date ? (
                      <FormErrorMessage>
                        {errors.purchasing_date}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Box>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                <FormControl
                  isInvalid={
                    errors.floor_name &&
                    touched.floor_name
                  }
                >
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
                  />
                  {errors.floor_name &&
                  touched.floor_name ? (
                    <FormErrorMessage>
                      {errors.floor_name}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl
                  isInvalid={
                    errors.room_name &&
                    touched.room_name
                  }
                >
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
                  />
                  {errors.room_name &&
                  touched.room_name ? (
                    <FormErrorMessage>
                      {errors.room_name}
                    </FormErrorMessage>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RequireAuth(Assets);
