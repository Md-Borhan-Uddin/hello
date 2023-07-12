import React, { useEffect, useRef, useState } from "react";
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
  TableCaption,
  TableContainer,
  Select,
  Spacer,
  useColorModeValue,
  useDisclosure,
  useToast,
  Checkbox,
  Divider,
  Flex,
  VStack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  RadioGroup,
  Radio,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { scheduleSchima } from "../../../Schima";
import axios from "axios";
import { baseUrl } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import Paginator from "../../../components/Paginator";

const inputdata = {
  name: "",
  description: "",
  real_estate_id: "",
  asset_id: "",
  is_reminder: false,
  maintain_date: "",
  reminder_date: "",
  status: "Active",
  invoice_file: "",
};

function ScheduleMaintain() {
  const [isEdit, setIsEdit] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [realestate, setrealestate] = useState([]);
  const [asset, setAsset] = useState([]);
  const [id, setId] = useState();
  const router = useNavigate();
  const toast = useToast();
  const [customerror, setcustomerror] = useState({});
  const [nextUrl, setNextUrl] = useState(null)
  const [previousUrl, setPreviousUrl] = useState(null)
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { access_token, userType } = getUser();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  const getObject = async (url, id = null) => {
    let endpoint = baseUrl.defaults.baseURL + `/${url}/`;
    if (id) {
      endpoint = baseUrl.defaults.baseURL + `/${url}/${id}/`;
    }
    const res = axios.get(endpoint, { headers: headers });
    return res;
  };
  const handlePageChange = (url,action)=>{
    console.log('change')
    axios.get(url, {headers:headers})
      .then((res) =>{
        if(action==='next'){
          setCurrentPage(currentPage+1)
        }
        if(action==='previous'){
          setCurrentPage(currentPage-1)
        }
        setSchedules(res.data.results)
        setNextUrl(res.data.next)
        setPreviousUrl(res.data.previous)
        setTotalItems(res.data.count)
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getObject("schedule-maintain")
      .then((res) =>{
        setSchedules(res.data.results)
        setNextUrl(res.data.next)
        setPreviousUrl(res.data.previous)
        setTotalItems(res.data.count)
      })
      .catch((error) => console.log(error));
  }, []);

  const {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    handleReset,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: inputdata,
    validationSchema: scheduleSchima,
    onSubmit: (values, { setSubmitting }) => {
      axios
        .post(baseUrl.defaults.baseURL + "/schedule-maintain/", values, {
          headers: headers,
        })
        .then((res) => {
          console.log('data',res.data);

          if (res.status == 201) {
            getObject("schedule-maintain")
              .then((res) => {
                setSchedules(res.data.results);
              })
              .catch((error) => console.log(error));

            toast({
              title: "The Schedule Maintenance is Created Successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            onClose();
            handleReset();
          }
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
    setIsEdit(true);
    const { value } = e.target;
    setId(value);
    axios
      .get(baseUrl.defaults.baseURL + `/schedule-maintain/${value}/`, values, {
        headers: headers,
      })
      .then((res) => {
        const { data } = res;
        getObject("realestate", userType)
          .then((res) => setrealestate(res.data))
          .catch((error) => console.log(error));
        getObject("asset-by", data?.real_estate.id)
          .then((res) => setAsset(res.data))
          .catch((error) => console.log(error));
        console.log(res);
        onOpen();

        setValues({
          name: data?.name,
          description: data?.description,
          real_estate_id: data?.real_estate.id,
          asset_id: data?.asset.id,
          is_reminder: data?.is_remainder ? "true" : false,
          maintain_date: data?.maintain_date,
          reminder_date: data?.reminder_date,
          status: data?.status,
          invoice_file: data?.invoice_file,
        });
        console.log(values);
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
      .patch(baseUrl.defaults.baseURL + `/schedule-maintain/${id}/`, values, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        getObject("schedule-maintain")
          .then((res) => setSchedules(res.data))
          .catch((error) => console.log(error));
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
      .delete(baseUrl.defaults.baseURL + `/schedule-maintain/${value}/`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        getObject("schedule-maintain").then((res) => setSchedules(res.data));
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

  const handleEstateChange = (e) => {
    const { value: id } = e.target;
    setFieldValue("real_estate_id", id);
    axios
      .get(baseUrl.defaults.baseURL + `/asset-by/${id}/`, { headers: headers })
      .then((res) => {
        console.log("asset", res);
        setAsset(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 404) {
          toast({
            title: "You don't have Registered Real Estate",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          onClose();
        }
      });
  };
  const handleAdd = () => {
    axios
      .get(baseUrl.defaults.baseURL + `/realestate/${userType}/`, {
        headers: headers,
      })
      .then((res) => {
        console.log("real", res);
        setrealestate(res.data);
        handleReset();
        setIsEdit(false);
        onOpen();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 404) {
          toast({
            title: "You don't have Registered Real Estate",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          onClose();
        }
      });
  };

  return (
    <>
      <Box py={12} px={4}>
        <HStack spacing={2} textAlign="center" mb="1rem">
          <Heading as="h1" fontSize="4xl">
            Schedule List
          </Heading>
          <Spacer />
          <Button colorScheme="teal" onClick={handleAdd}>
            Add Package
          </Button>
        </HStack>
        <Box>
          {schedules.length>0?
          <Box>
            <TableContainer>
            <Table variant="simple" textAlign={"center"}>
              <Thead bg={"gray.200"}>
                <Tr>
                  <Th>Name</Th>
                  <Th>Maintain Date</Th>
                  <Th>Status</Th>
                  <Th>Real Estate</Th>
                  <Th>Asset</Th>
                  <Th textAlign={"center"}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {schedules.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td>{item.maintain_date}</Td>
                      <Td>{item.status}</Td>
                      <Td>{item.real_estate.name}</Td>
                      <Td>{item.asset.name}</Td>
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
          <Box>
              <Paginator handleNextPage={()=>handlePageChange(nextUrl, 'next')} handlePreviousPage={()=>handlePageChange(previousUrl, 'previous')} isNext={nextUrl} isPrevious={previousUrl} totalItem={totalItems} page={currentPage} />
            </Box>
          </Box>:<Text fontSize={'2xl'} textAlign={'center'} mt={'2rem'}>You haven't Schedule</Text>}
        </Box>
      </Box>

      {/* Package Add modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"50%"}>
          <ModalHeader>Add Schedule</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <FormControl isInvalid={errors.real_estate_id}>
                  <FormLabel
                    color="secondary.600"
                    fontWeight="semibold"
                    fontSize="0.9rem"
                  >
                    Real Estate
                  </FormLabel>
                  <Select
                    placeholder="Select Real Estate"
                    name="duration_date"
                    value={values.real_estate_id}
                    onChange={handleEstateChange}
                  >
                    {realestate.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                  {errors.real_estate_id && touched.real_estate_id ? (
                    <FormErrorMessage>{errors.real_estate_id}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </Box>
              <Box mb={2}>
                <FormControl isInvalid={errors.asset_id}>
                  <FormLabel
                    color="secondary.600"
                    fontWeight="semibold"
                    fontSize="0.9rem"
                  >
                    Asset
                  </FormLabel>
                  <Select
                    placeholder="Select Asset"
                    name="asset_id"
                    value={values.asset_id}
                    onChange={(e) => setFieldValue("asset_id", e.target.value)}
                  >
                    {asset.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                  {errors.asset_id && touched.asset_id ? (
                    <FormErrorMessage>{errors.asset_id}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </Box>

              <HStack mb={2}>
                <FormControl isInvalid={errors.name}>
                  <FormLabel
                    color="secondary.600"
                    fontWeight="semibold"
                    fontSize="0.9rem"
                  >
                    Schedule Name
                  </FormLabel>
                  <Input
                    placeholder="Schedule name"
                    onChange={handleChange}
                    name="name"
                    value={values.name}
                  />
                  {errors.name && touched.name ? (
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl isInvalid={errors.is_reminder}>
                  <FormLabel
                    color="secondary.600"
                    fontWeight="semibold"
                    fontSize="0.9rem"
                  >
                    Start Schedule Reminder
                  </FormLabel>
                  <RadioGroup
                    value={values.is_reminder}
                    onChange={(e) => setFieldValue("is_reminder", e)}
                    name="is_reminder"
                  >
                    <HStack>
                      <Radio value="true" colorScheme="primary">
                        Yes
                      </Radio>
                      <Radio value="false" colorScheme="primary">
                        No
                      </Radio>
                    </HStack>
                  </RadioGroup>
                  {errors.is_reminder && touched.is_reminder ? (
                    <FormErrorMessage>{errors.is_reminder}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </HStack>

              <HStack mb={2}>
                <FormControl isInvalid={errors.maintain_date}>
                  <FormLabel
                    color="secondary.600"
                    fontWeight="semibold"
                    fontSize="0.9rem"
                  >
                    Maintain Date
                  </FormLabel>
                  <Input
                    placeholder="Maintain Date"
                    onChange={handleChange}
                    name="maintain_date"
                    value={values.maintain_date}
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                  />
                  {errors.maintain_date && touched.maintain_date ? (
                    <FormErrorMessage>{errors.maintain_date}</FormErrorMessage>
                  ) : null}
                </FormControl>

                <FormControl isInvalid={errors.reminder_date}>
                  <FormLabel
                    color="secondary.600"
                    fontWeight="semibold"
                    fontSize="0.9rem"
                  >
                    Reminder Date
                  </FormLabel>
                  <Input
                    onChange={handleChange}
                    name="reminder_date"
                    value={values.reminder_date}
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                  />
                  {errors.reminder_date && touched.reminder_date ? (
                    <FormErrorMessage>{errors.reminder_date}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </HStack>

              <Box mb={2}>
                <FormControl isInvalid={errors.description}>
                  <FormLabel
                    color="secondary.600"
                    fontWeight="semibold"
                    fontSize="0.9rem"
                  >
                    Schedule Description
                  </FormLabel>
                  <Textarea
                    placeholder="Schedule Description"
                    onChange={handleChange}
                    name="description"
                    value={values.description}
                  ></Textarea>
                  {errors.description && touched.description ? (
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                  ) : null}
                </FormControl>
              </Box>

              {isEdit && (
                <HStack mb={2}>
                  <FormControl isInvalid={errors.invoice_file}>
                    <FormLabel
                      color="secondary.600"
                      fontWeight="semibold"
                      fontSize="0.9rem"
                    >
                      Related Invoice
                    </FormLabel>
                    <Input
                      placeholder="Invoice"
                      onChange={handleChange}
                      name="invoice_file"
                      value={values.invoice_file}
                      type="file"
                    />
                    {errors.invoice_file && touched.invoice_file ? (
                      <FormErrorMessage>{errors.invoice_file}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl isInvalid={errors.real_estate_id}>
                    <FormLabel
                      color="secondary.600"
                      fontWeight="semibold"
                      fontSize="0.9rem"
                    >
                      Real Estate
                    </FormLabel>
                    <Select
                      placeholder="Schedule Statue"
                      name="status"
                      value={values.status}
                      onChange={handleEstateChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Cancele">Cancele</option>
                      <option value="Done">Done</option>
                    </Select>
                    {errors.status && touched.status ? (
                      <FormErrorMessage>{errors.status}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                </HStack>
              )}

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



export default RequireAuth(ScheduleMaintain)