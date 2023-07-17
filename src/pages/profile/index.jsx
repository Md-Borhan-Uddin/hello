import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import React, { useEffect, useRef, useState } from "react";
import { FiFile } from 'react-icons/fi'
import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { HiOutlineCamera } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import { useGetUserQuery } from "../../../data/auth/service/userServide";
import { useSelector } from "react-redux";
import { useChangePasswordMutation } from "../../../data/auth/service/authServices";
import {
  changePasswordSchima,
  registrationSchima,
  userUpdateSchima,
} from "../../../Schima";
import { Formik, useFormik } from "formik";
import { blobUrlToFile, butifyErrors } from "../../../utility/utlity";

function Profile() {
  const profileData = {
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    image:""
  };
  // const [user, setUser] = useState({})
  
  const { access_token } = getUser();
  const { data: profile, isSuccess: isProfileSuccess } =
    useGetUserQuery(access_token);
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  const [customerrors, setcustomerror] = useState([]);
  const toast = useToast();
  const [changepassword, { isSuccess: isChangePasswordSuccess, isLoading }] =
    useChangePasswordMutation();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: profileData,
    validationSchema: userUpdateSchima,
    onSubmit: (values, { setSubmitting }) => {
      console.log("val", values);
      axios
        .patch(`${baseURL}/user-edit/${values.username}/`, values, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          const {data} = res
          setValues({
            first_name: data?.first_name,
            last_name: data?.last_name,
            middle_name: data?.middle_name,
            username: data?.username,
            email: data?.email,
            mobile_number: data?.mobile_number,
          });
          blobUrlToFile(res.data?.photo).then(res=>{
            setFieldValue('image',res)
          })
          toast({
            description: "Update Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log("errors", err);
          const e = butifyErrors(res.error.data);
          setcustomerror(e);
          window.scrollTo(0, 0);
        });
    },
  });

  const handleImage = (e)=>{
    console.log(e)
    // setFieldValue('image',e.target.files[0])
    const image = e.target.files[0]
    console.log(image)
    axios
        .patch(`${baseURL}/user-edit/${values.username}/`, {image:image}, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          const {data} = res
          setValues({
            first_name: data?.first_name,
            last_name: data?.last_name,
            middle_name: data?.middle_name,
            username: data?.username,
            email: data?.email,
            mobile_number: data?.mobile_number,
            image:data?.image
          });
          
        })
        .catch((err) => {
          console.log(err)
        });

  }
  const inputdata = {
    confirm_password: "",
    new_password: "",
  };
  useEffect(() => {
    setValues({
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      middle_name: profile?.middle_name,
      username: profile?.username,
      email: profile?.email,
      mobile_number: profile?.mobile_number,
      image:profile?.image
    });
  }, []);
  return (
    <>
      <Box ml={"1rem"}>
        <HStack alignItems={"flex-start"}>
          <Center py={6}>
            <Box
              maxW={"220px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              rounded={"lg"}
              p={6}
              textAlign={"center"}
            >
              <Avatar
                size={"xl"}
                src={values.image}
                alt={"Avatar Alt"}
                mb={4}
                pos={"relative"}
              >
                <AvatarBadge
                  border={0}
                >
                  <FileUpload
                  accept={'image/*'}
                  multiple
                  handlePhoto={handleImage}
                  
                >
                  <IconButton icon={<HiOutlineCamera />} borderRadius={'full'} />
                    
                </FileUpload>
                </AvatarBadge>
              </Avatar>
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                {profile?.username}
              </Heading>
              <Text fontWeight={600} color={"gray.500"} mb={4}>
                {profile?.user_type}
              </Text>

              <Stack mt={8} direction={"row"} spacing={4}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                >
                  Message
                </Button>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                >
                  Follow
                </Button>
              </Stack>
            </Box>
          </Center>
          <Box>
            <Box pt={6}>
              <Tabs position="relative" variant="unstyled">
                <TabList>
                  <Tab>Basic Information</Tab>
                  <Tab>Membership</Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="primary.500"
                  borderRadius="1px"
                />
                <TabPanels>
                  <TabPanel>
                    <Box bg={"white"} p={"0.5rem"}>
                      <UpdateForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        handleSubmit={handleSubmit}
                        setValues={setValues}
                        isSubmitting={isSubmitting}
                        customerrors={customerrors}
                        setFieldValue={setFieldValue}
                      />
                      <Text fontSize={"2xl"} fontWeight={"semibold"}>
                        Change password
                      </Text>

                      <Formik
                        initialValues={inputdata}
                        validationSchema={changePasswordSchima}
                        onSubmit={async (
                          values,
                          { setSubmitting, resetForm }
                        ) => {
                          const res = await changepassword(values);
                          if (res.data) {
                            console.log(res.data);

                            toast({
                              description: `${res.data.message}`,
                              status: "success",
                              duration: 3000,
                              isClosable: true,
                            });
                            resetForm();
                          }
                          if (res.error) {
                            const e = butifyErrors(res.error.data);
                            console.log(res.error);
                            setcustomerror(e);
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit: passwordSubmit,
                          isSubmitting,
                        }) => (
                          <form onSubmit={passwordSubmit}>
                            {customerrors && (
                              <>
                                {customerrors.map((item, i) => (
                                  <p key={i} className="text-red-600">
                                    {item}
                                  </p>
                                ))}
                              </>
                            )}
                            <FormControl
                              isInvalid={
                                errors.new_password && touched.new_password
                              }
                            >
                              <FormLabel>New Password</FormLabel>
                              <Input
                                type="password"
                                name="new_password"
                                placeholder="new password"
                                value={values.new_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.new_password && touched.new_password ? (
                                <FormErrorMessage>
                                  {errors.new_password}.
                                </FormErrorMessage>
                              ) : null}
                            </FormControl>

                            <FormControl
                              isInvalid={
                                errors.confirm_password &&
                                touched.confirm_password
                              }
                            >
                              <FormLabel>Confirm Password</FormLabel>
                              <Input
                                type="password"
                                name="confirm_password"
                                placeholder="confirm password"
                                value={values.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.confirm_password &&
                              touched.confirm_password ? (
                                <FormErrorMessage>
                                  {errors.confirm_password}.
                                </FormErrorMessage>
                              ) : null}
                            </FormControl>

                            <div className="flex flex-col-reverse mt-4 gap-4 justify-between items-center sm:flex-row">
                              <button
                                type="submit"
                                className="text-secondary bg-[rgb(34,220,118)] hover:bg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                              >
                                change
                              </button>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <p>Membership</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </HStack>
      </Box>
    </>
  );
}

export default RequireAuth(Profile);

const UpdateForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setValues,
  setFieldValue,
  customerrors,
}) => {
  console.log(errors);
  const [midname, setMidname] = useState('')
  useEffect(()=>{
    setFieldValue('middle_name',midname)
  },[midname])
  return (
    <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
      {customerrors && (
        <>
          {customerrors.map((item, i) => (
            <p key={i} className="text-red-600">
              {item}
            </p>
          ))}
        </>
      )}
      <div className="grid md:grid-cols-2 md:gap-3">
        <FormControl isInvalid={errors.username && touched.username}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            placeholder="username"
            isDisabled
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username ? (
            <FormErrorMessage>{errors.username}.</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl isInvalid={errors.first_name && touched.first_name}>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.first_name && touched.first_name ? (
            <FormErrorMessage>{errors.first_name}.</FormErrorMessage>
          ) : null}
        </FormControl>
      </div>
      <div className="grid md:grid-cols-2 md:gap-3">
        <FormControl isInvalid={errors.middle_name && touched.middle_name}>
          <FormLabel>Middle Name</FormLabel>
          <Input
            type="text"
            name="middle_name"
            placeholder="Middle Name"
            onChange={(e)=>setMidname(e.target.value)}
            value={midname}
            onBlur={handleBlur}
          />
          {errors.middle_name && touched.middle_name ? (
            <FormErrorMessage>{errors.middle_name}.</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={errors.last_name && touched.last_name}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.last_name && touched.last_name ? (
            <FormErrorMessage>{errors.last_name}.</FormErrorMessage>
          ) : null}
        </FormControl>
      </div>
      <div className="grid md:grid-cols-2 md:gap-3">
        <FormControl isInvalid={errors.email && touched.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <FormErrorMessage>{errors.email}.</FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl isInvalid={errors.mobile_number && touched.mobile_number}>
          <FormLabel>Mobile Number</FormLabel>
          <Input
            type="text"
            name="mobile_number"
            placeholder="Mobile Number"
            value={values.mobile_number}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.mobile_number && touched.mobile_number ? (
            <FormErrorMessage>{errors.mobile_number}.</FormErrorMessage>
          ) : null}
        </FormControl>
      </div>

      <button
        type="submit"
        className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Update
      </button>
    </form>
  );
};




const FileUpload = (props) => {
  const { accept, multiple, children, handlePhoto } = props
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)

  const handleClick = () => inputRef.current?.click()
  const handleChange = (e)=>{
    console.log(e)
    handlePhoto(e)
  }

  return (
      <InputGroup onClick={handleClick}>
        <input
          type={'file'}
          multiple={multiple || false}
          hidden
          accept={accept}
          ref={inputRef}
          onChange={handleChange}
        />
        <>
          {children}
        </>
      </InputGroup>
  )
}
