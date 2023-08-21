import React, { useEffect, useRef, useState } from "react";
import DeleteButton from '../../../components/deleteButton'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  List,
  ListItem,
  ListIcon,
  Card,
  CardHeader,
  CardBody,
  Select,
  Spacer,
  useDisclosure,
  useToast,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Radio,
  StackDivider,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  CardFooter,
  RadioGroup,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  paymentSchima,
} from "../../../Schima";
import axios from "axios";
import { baseURL, baseUrl } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";

const inputdata = {
  price: 0,
  package_id: "",
  payment_method: "",
  real_estate_number: "",
  card_number: "",
  card_holder_name: null,
  expire_date: "",
  cvv: "",
  mobile_number: "",
};

function Membership() {
  const [isEdit, setIsEdit] = useState(false);
  const [packages, setPackages] = useState([]);
  const [membership, setMembership] = useState([]);
  const [id, setId] = useState();
  const router = useNavigate();
  const toast = useToast();
  const [customerror, setcustomerror] = useState({});
  const [packageInput, setPackageInput] = useState("");
  const [packagedata, setPackagedata] = useState({});
  const [userType, setUserType] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: expairModalisOpen,
    onClose: expairModalonClose,
    onOpen: expairModalonOpen,
  } = useDisclosure();
  const { access_token } = getUser();

  const priceId = useRef();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  useEffect(() => {
    axios
      .get(baseURL + "/package/", { headers: headers })
      .then((res) => {
        setPackages(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const { userType } = getUser();
    setUserType(userType);

    axios
      .get(baseURL + "/membership/", { headers: headers })
      .then((res) => {
        console.log("membership", res.data);
        setMembership(res.data);
      })
      .catch((error) => {
        console.log("membership", error);
      });
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
    validationSchema: paymentSchima,
    onSubmit: (values, { setSubmitting }) => {
      const date = new Date();
      date.setDate(packagedata.duration_date);
      date.setMonth(packagedata.duration_month);
      values.package_id = packagedata.id;
      values.user_id = membership[0]?.user.id;
      values.expire_date = new Date(
        `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
      );

      console.log(values);
      axios
        .post(baseURL + "/membership/", values, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          
          if (res.status == 201) {
            packages.push(res.data);
            toast({
              title: "Package create successfully",
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

  const handleShow = (e) => {
    if (membership[0]) {
      expairModalonOpen();
    } else {
      onOpen();
    }
  };

  const handleEdit = (e) => {
    setIsEdit(true);
    const { value } = e.target;
    setId(value);
    axios
      .get(baseURL + `/package/${value}/`, values, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        onOpen();
        setValues({
          name: res.data?.name,
          description: res.data?.description,
          duration_date: res.data?.duration_date,
          duration_month: res.data?.duration_month,
          is_free: res.data.is_free ? "true" : false,
          is_active: res.data.is_active ? "true" : false,
          pricing_approach: res.data?.pricing_approach,
          default_price: res.data?.default_price,
          default_real_estate_number: res.data?.default_real_estate_number,
          is_renewal: res.data.is_renewal ? "true" : false,
          enabling_adding_extra_real_estate: res.data
            .enabling_adding_extra_real_estate
            ? "true"
            : false,
          price_per_real_estate: res.data?.price_per_real_estate,
          feature: res.data?.feature,
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

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(baseURL + `/package/${id}/`, values, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        getPackage().then((res) => setPackages(res));
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

  const handleDelete = (id) => {

    axios
      .delete(baseURL + `/membership/${id}/`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        axios
          .get(baseUrl.defaults.baseURL + "/membership/", { headers: headers })
          .then((res) => setMembership(res.data))
          .catch((error) => console.log(error));
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

  const handlePackage = (e) => {
    const { value } = e.target;
    setPackageInput(value);
    axios
      .get(baseUrl.defaults.baseURL + `/package/${value}/`, {
        headers: headers,
      })
      .then((res) => setPackagedata(res.data))
      .catch((error) => setcustomerror(error.response.data));
  };

  if (userType === "Admin") {
    return (
      <>
        <Box py={12} px={4}>
          <HStack spacing={2} textAlign="center" mb="1rem">
            <Heading fontSize="4xl">All Membership</Heading>
            <Spacer />
          <Button colorScheme="primary" onClick={()=>{handleReset();setIsEdit(false); onOpen()}}>
            Add Membership
          </Button>
          </HStack>
          <Box>
            <TableContainer>
              <Table variant="simple" textAlign={"center"}>
                <Thead bg={"gray.200"}>
                  <Tr>
                    <Th>Package Name</Th>
                    <Th>Start Date </Th>
                    <Th>Payment</Th>
                    <Th>Expaire Date </Th>
                    <Th>User Name</Th>
                    <Th textAlign={"center"}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {membership.map((item) => {
                    return (
                      <Tr key={item.id}>
                        <Td>{item.package.name}</Td>
                        <Td>
                          {`${new Date(item.start_date).getDate()}/${new Date(
                            item.start_date
                          ).getMonth()}/${new Date(
                            item.start_date
                          ).getFullYear()}`}
                        </Td>
                        <Td>
                          {item.is_pay ? (
                            <Badge variant="solid" colorScheme="primary">
                              Success
                            </Badge>
                          ) : (
                            <Badge variant="solid" colorScheme="red">
                              pendding
                            </Badge>
                          )}
                        </Td>
                        <Td>{`${new Date(
                          item.expire_date
                        ).getDate()}/${new Date(
                          item.expire_date
                        ).getMonth()}/${new Date(
                          item.expire_date
                        ).getFullYear()}`}</Td>
                        <Td>{item.user.username}</Td>
                        <Td>
                          <HStack
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            <DeleteButton handleDelete={handleDelete} id={item.id} />
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
      </>
    );
  } else {
    return (
      <>
        
        <Box py={12} px={4}>
          <HStack spacing={2} mb="1rem" alignItems={"flex-start"}>
            <Box width={"50%"}>
              {membership.length > 0 ? (
                <Card>
                  <CardHeader>
                    <HStack>
                      <Heading size="md">Active Package</Heading>
                      <Spacer />
                      <Button colorScheme="primary">Renewal</Button>
                    </HStack>
                  </CardHeader>

                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <HStack>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Package Name
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {membership[0]?.package.name}
                          </Text>
                        </Box>
                        <Spacer />
                        <Box>
                          <Heading size="xs" as="h3" textTransform="uppercase">
                            Start Date
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {`${new Date(
                              membership[0]?.start_date
                            ).getDate()}/${new Date(
                              membership[0]?.start_date
                            ).getMonth()}/${new Date(
                              membership[0]?.start_date
                            ).getFullYear()}`}
                          </Text>
                        </Box>
                        <Spacer />
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Expiration Date
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {`${new Date(
                              membership[0]?.expire_date
                            ).getDate()}/${new Date(
                              membership[0]?.expire_date
                            ).getMonth()}/${new Date(
                              membership[0]?.expire_date
                            ).getFullYear()}`}
                          </Text>
                        </Box>
                      </HStack>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Description
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {membership[0]?.package.description}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Feature
                        </Heading>
                        <List spacing={3}>
                          <SimpleGrid columns={{ base: 1, md: 2 }}>
                            {membership[0]?.package.feature.map((item, i) => {
                              return (
                                <ListItem>
                                  <ListIcon
                                    key={i}
                                    as={MdCheckCircle}
                                    color="green.500"
                                  />
                                  {item}
                                </ListItem>
                              );
                            })}
                          </SimpleGrid>
                        </List>
                      </Box>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <Button colorScheme="primary" onClick={onOpen}>
                      Add More Real Estate
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Text>You don’t have active membership</Text>
              )}
            </Box>
            <Box width={"50%"}>
              <Card>
                <CardHeader>
                  <HStack>
                    <Heading size="md">You Need More</Heading>
                    <Spacer />
                    {/* <Button colorScheme="teal">Renewal</Button> */}
                  </HStack>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Select
                        placeholder="Select Package name"
                        value={packageInput}
                        onChange={handlePackage}
                      >
                        {packages.map((item, i) => (
                          <option key={i} value={item.name}>
                            {item.name} price-{item.default_price}
                          </option>
                        ))}
                      </Select>
                    </Box>

                    {packagedata.description && (
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Description
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {packagedata.description}
                        </Text>
                      </Box>
                    )}
                    <HStack>
                      {packagedata.default_price && (
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Price
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {packagedata.default_price}
                          </Text>
                        </Box>
                      )}
                      <Spacer />
                      {packagedata.duration_month && (
                        <Box>
                          <Heading size="xs" as="h3" textTransform="uppercase">
                            Duration
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {packagedata.duration_month && (
                              <span>{`${packagedata.duration_month} months`}</span>
                            )}
                          </Text>
                        </Box>
                      )}
                      <Spacer />
                      {packagedata.is_free && (
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Free
                          </Heading>
                          <Text
                            pt="2"
                            fontSize="sm"
                            color={
                              packagedata.is_free ? "green.400" : "red.400"
                            }
                          >
                            <span>{packagedata.is_free ? "Yes" : "No"}</span>
                          </Text>
                        </Box>
                      )}
                    </HStack>
                    {packagedata.feature && (
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Feature
                        </Heading>
                        <List spacing={3}>
                          <SimpleGrid columns={{ base: 1, md: 2 }}>
                            {packagedata &&
                              packagedata.feature?.map((item, i) => {
                                return (
                                  <ListItem key={i}>
                                    <ListIcon
                                      key={i}
                                      as={MdCheckCircle}
                                      color="green.500"
                                    />
                                    {item}
                                  </ListItem>
                                );
                              })}
                          </SimpleGrid>
                        </List>
                      </Box>
                    )}
                  </Stack>
                </CardBody>
                {packagedata.id && (
                  <Button
                    variant="outline"
                    onClick={handleShow}
                    colorScheme="primary"
                    _hover={{ bg: "rgb(34,220,118)", color: "white" }}
                  >
                    Needed Package
                  </Button>
                )}
              </Card>
            </Box>
          </HStack>
        </Box>

        {/* Package Add modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW={"50%"}>
            <ModalHeader>Payment Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {packagedata.is_free ? (
                <Box>
                  <Text>Are You Activate Free Membership?</Text>
                  <ModalFooter>
                    <Button colorScheme="primary" mr={3}>
                      Active
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Box mb={2}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
                      <FormControl>
                        <FormLabel
                          color="secondary.600"
                          fontWeight="semibold"
                          fontSize="0.9rem"
                        >
                          Package price
                        </FormLabel>
                        <Input
                          type="number"
                          value={
                            packagedata.pricing_approach ===
                            "Based on number of real estate only"
                              ? values.price
                              : packagedata.default_price
                          }
                          ref={priceId}
                          disabled
                          color={"black"}
                          fontWeight={"black"}
                        />
                      </FormControl>
                      {packagedata.pricing_approach ===
                        "Based on number of real estate only" && (
                        <FormControl isInvalid={errors.real_estate_number}>
                          <FormLabel
                            color="secondary.600"
                            fontWeight="semibold"
                            fontSize="0.9rem"
                          >
                            Number of Real Estate
                          </FormLabel>
                          <Input
                            type="number"
                            name="real_estate_number"
                            value={values.real_estate_number}
                            placeholder="Number of Real Estate"
                            onChange={(e) => {
                              handleChange(e);
                              const { value } = e.target;
                              setFieldValue(
                                "price",
                                (
                                  packagedata.price_per_real_estate *
                                  parseInt(value)
                                ).toString()
                              );
                            }}
                          />
                        </FormControl>
                      )}
                    </SimpleGrid>
                  </Box>
                  <FormControl isInvalid={errors.pay_method} mb={3}>
                    <FormLabel
                      color="secondary.600"
                      fontWeight="semibold"
                      fontSize="0.9rem"
                    >
                      Payment Method
                    </FormLabel>
                    <RadioGroup
                      onChange={(e) => {
                        setFieldValue("payment_method", e);
                        console.log(values);
                      }}
                      value={values.is_free}
                      name="payment_method"
                    >
                      <Stack direction="row">
                        <Radio value="mada" onChange={handleChange}>
                          Mada
                        </Radio>
                        <Radio value="credit card" onChange={handleChange}>
                          Credit Card
                        </Radio>
                        <Radio value="STC pay" onChange={handleChange}>
                          STC Pay
                        </Radio>
                        <Radio value="Apple pay" onChange={handleChange}>
                          Apple Pay
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>

                  <Box mb={2}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                      <FormControl isInvalid={errors.mobile_number}>
                        <FormLabel
                          color="secondary.600"
                          fontWeight="semibold"
                          fontSize="0.9rem"
                        >
                          Mobile Number
                        </FormLabel>
                        <Input
                          type="text"
                          name="mobile_number"
                          value={values.mobile_number}
                          onChange={handleChange}
                          placeholder="Mobile Number"
                        />
                        {errors.mobile_number && touched.mobile_number ? (
                          <FormErrorMessage>
                            {errors.mobile_number}
                          </FormErrorMessage>
                        ) : null}
                      </FormControl>
                    </SimpleGrid>
                  </Box>
                  {(values.payment_method === "mada" ||
                    values.payment_method === "credit card") && (
                    <Box mb={2}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                        <FormControl isInvalid={errors.card_holder_name}>
                          <FormLabel
                            color="secondary.600"
                            fontWeight="semibold"
                            fontSize="0.9rem"
                          >
                            Card Holder Name
                          </FormLabel>
                          <Input
                            type="text"
                            name="card_holder_name"
                            value={values.card_holder_name}
                            onChange={handleChange}
                            placeholder="Card Holder Name"
                          />
                          {errors.card_holder_name &&
                          touched.card_holder_name ? (
                            <FormErrorMessage>
                              {errors.card_holder_name}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                        <FormControl isInvalid={errors.card_number}>
                          <FormLabel
                            color="secondary.600"
                            fontWeight="semibold"
                            fontSize="0.9rem"
                          >
                            Card Number
                          </FormLabel>
                          <Input
                            type="text"
                            name="card_number"
                            value={values.card_number}
                            onChange={handleChange}
                            placeholder="Card number"
                          />
                          {errors.card_number && touched.card_number ? (
                            <FormErrorMessage>
                              {errors.card_number}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>

                        <FormControl isInvalid={errors.expaire_date}>
                          <FormLabel
                            color="secondary.600"
                            fontWeight="semibold"
                            fontSize="0.9rem"
                          >
                            Expiration Date
                          </FormLabel>
                          <Input
                            type="month"
                            name="expair_date"
                            value={values.expaire_date}
                            onChange={handleChange}
                            placeholder="Expiration Date"
                          />
                          {errors.expaire_date && touched.expaire_date ? (
                            <FormErrorMessage>
                              {errors.expaire_date}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                        <FormControl isInvalid={errors.cvv}>
                          <FormLabel
                            color="secondary.600"
                            fontWeight="semibold"
                            fontSize="0.9rem"
                          >
                            CVV
                          </FormLabel>
                          <Input
                            type="text"
                            name="cvv"
                            value={values.cvv}
                            onChange={handleChange}
                            placeholder="CVV"
                          />
                          {errors.cvv && touched.cvv ? (
                            <FormErrorMessage>{errors.cvv}</FormErrorMessage>
                          ) : null}
                        </FormControl>
                      </SimpleGrid>
                    </Box>
                  )}

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>

                    <Button
                      type="submit"
                      variant="outline"
                      colorScheme="primary"
                      transition="ease-in-out 0.5s"
                      _hover={{ bgColor: "primary.600", color: "#fff" }}
                    >
                      Pay
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={expairModalisOpen} onClose={expairModalonClose}>
          <ModalOverlay />
          <ModalContent maxW={"50%"}>
            <ModalHeader>Payment Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                You have an active membership that expired on{" "}
                {`${new Date(membership[0]?.expire_date).getDate()}/${new Date(
                  membership[0]?.expire_date
                ).getMonth()}/${new Date(
                  membership[0]?.expire_date
                ).getFullYear()}`}
                , Would like cancel it, and proceed with new membership
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="primary"
                mr={3}
                onClick={() => {
                  expairModalonClose();
                  onOpen();
                  axios
                    .delete(
                      baseUrl.defaults.baseURL + `/membership/${membership[0]?.id}/`,
                      {
                        headers: headers,
                      }
                    )
                    .then((res) => {
                      console.log(res);
                      axios
                        .get(baseUrl.defaults.baseURL + "/membership/", {
                          headers: headers,
                        })
                        .then((res) => setMembership(res.data))
                        .catch((error) => console.log(error));
                      
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
                }}
              >
                Yes
              </Button>
              <Button onClick={expairModalonClose}>No</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
}



export default RequireAuth(Membership)