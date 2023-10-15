import React, { useEffect, useRef, useState } from "react";
import DeleteButton from "../../../components/deleteButton";
import {
  Box,
  Button,
  HStack,
  Heading,
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { paymentSchima } from "../../../Schima";
import { baseURL, baseUrl } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import baseAxios from "../../../utility/axiosConfig";
import Form from "./form";

const inputdata = {
  price: 0,
  package_id: "",
  payment_method: "",
  real_estate_number: "",
  card_number: "",
  card_holder_name: "",
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

  const {
    isOpen: extraAddFormOpen,
    onClose: extraAddFormClose,
    onOpen: extraAddFormOnOpen,
  } = useDisclosure();

  const { access_token } = getUser();

  const priceId = useRef();
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  useEffect(() => {
    baseAxios
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

    baseAxios
      .get("/membership/", { headers: headers })
      .then((res) => {
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
      baseAxios
        .post("/membership/", values, {
          headers: headers,
        })
        .then((res) => {
          if (res.status == 201) {
            // packages.push(res.data);
            // setMembership([res.data])
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
    handleReset(e);
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
    baseAxios
      .get(`/package/${value}/`, values, {
        headers: headers,
      })
      .then((res) => {
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
    baseAxios
      .patch(`/package/${id}/`, values, {
        headers: headers,
      })
      .then((res) => {
        getPackage().then((res) => setPackages(res));
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

  const handleDelete = (id) => {
    baseAxios
      .delete(`/membership/${id}/`, {
        headers: headers,
      })
      .then((res) => {
        baseAxios
          .get("/membership/", { headers: headers })
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
    baseAxios
      .get(`/package/${value}/`, {
        headers: headers,
      })
      .then((res) => {
        setPackagedata(res.data);
      })
      .catch((error) => setcustomerror(error.response.data));
  };

  const handleMembership = () => {
    const data = {
      package_id: parseInt(packageInput),
      expire_date: new Date(),
      is_pay: true,
    };
    baseAxios
      .post("/membership/", data, { headers: headers })
      .then((res) => {
        setMembership([res.data]);
        toast({
          title: "Membership activated Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      })
      .catch((err) => {
        toast({
          title: "Somethings wrong try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleRenewal = () => {
    handleReset();
    setIsEdit(false);
    onOpen();
  };

  const handleAddExtra = () => {
    handleReset();
    setIsEdit(false);
    extraAddFormOnOpen();
  };

  if (userType === "Admin") {
    return (
      <>
        <Box py={12} px={4}>
          <HStack spacing={2} textAlign="center" mb="1rem">
            <Heading fontSize="4xl">All Membership</Heading>
            <Spacer />
            {/* <Button colorScheme="primary" onClick={handleMembershipBtn}>
            Add Membership
          </Button> */}
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
                            <DeleteButton
                              handleDelete={handleDelete}
                              id={item.id}
                            />
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
                      <Button colorScheme="primary" onClick={handleRenewal}>
                        Renewal
                      </Button>
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
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    {membership[0]?.package
                      .enabling_adding_extra_real_estate && (
                      <Button colorScheme="primary" onClick={handleAddExtra}>
                        Add More Real Estate
                      </Button>
                    )}
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
                          <option key={i} value={item.id}>
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
                    <Button
                      colorScheme="primary"
                      mr={3}
                      onClick={handleMembership}
                    >
                      Active
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </Box>
              ) : (
                <Form
                  handleSubmit={handleSubmit}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  handleMembership={handleMembership}
                  values={values}
                  onClose={onClose}
                  errors={errors}
                  priceId={priceId}
                  handleChange={handleChange}
                  packagedata={Object.keys(packagedata).length > 0 ? 'packagedata' : membership[0]?.package}
                />
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
                  baseAxios
                    .delete(`/membership/${membership[0]?.id}/`, {
                      headers: headers,
                    })
                    .then((res) => {
                      baseAxios
                        .get("/membership/", {
                          headers: headers,
                        })
                        .then((res) => setMembership(res.data))
                        .catch((error) => console.log(error));
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
                }}
              >
                Yes
              </Button>
              <Button onClick={expairModalonClose}>No</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* //extraAddForm */}
        <Modal isOpen={extraAddFormOpen} onClose={extraAddFormClose}>
          <ModalOverlay />
          <ModalContent maxW={"50%"}>
            <ModalHeader>Payment Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {packagedata.is_free ? (
                <Box>
                  <Text>Are You Activate Free Membership?</Text>
                  <ModalFooter>
                    <Button
                      colorScheme="primary"
                      mr={3}
                      onClick={handleMembership}
                    >
                      Active
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </Box>
              ) : (
                <Form
                  handleSubmit={handleSubmit}
                  exterRealestete={true}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  handleMembership={handleMembership}
                  values={values}
                  onClose={onClose}
                  errors={errors}
                  priceId={priceId}
                  handleChange={handleChange}
                  packagedata={Object.keys(packagedata).length > 0 ? 'packagedata' : membership[0]?.package}
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
}

export default RequireAuth(Membership);
