import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  Toast,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import { useGetUserQuery } from "../../../data/auth/service/userServide";
import { useSelector } from "react-redux";
import { useChangePasswordMutation } from "../../../data/auth/service/authServices";
import { changePasswordSchima } from "../../../Schima";
import { Formik } from "formik";

function Profile() {
  // const [user, setUser] = useState({})
  const { access_token } = getUser();
  const { profile, isSuccess: isProfileSuccess } = useGetUserQuery({
    data: access_token,
  });
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  const [customerrors, setcustomerror] = useState([]);
  const toast = useToast();
  const [changepassword, { isSuccess: isChangePasswordSuccess, isLoading }] =
    useChangePasswordMutation();
 
  const inputdata = {
    confirm_password: "",
    new_password: "",
  };
  return (
    <>
      <Box ml={"1rem"}>
        <HStack>
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
                src={user.image}
                alt={"Avatar Alt"}
                mb={4}
                pos={"relative"}
                _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: "green.300",
                  border: "2px solid white",
                  rounded: "full",
                  pos: "absolute",
                  bottom: 0,
                  right: 3,
                }}
              />
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                {user.username}
              </Heading>
              <Text fontWeight={600} color={"gray.500"} mb={4}>
                {user.user_type}
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
            <Box bg={'white'} p={'0.5rem'}>
              <Text fontSize={'2xl'} fontWeight={'semibold'}>Change password</Text>

              <Formik
                initialValues={inputdata}
                validationSchema={changePasswordSchima}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  const res = await changepassword(values);
                  if (res.data) {
                    console.log(res.data);

                    toast({
                      description: `${res.data.message}`,
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                    resetForm()
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
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
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
                      isInvalid={errors.new_password && touched.new_password}
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
                      isInvalid={errors.confirm_password && touched.confirm_password}
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
                      {errors.confirm_password && touched.confirm_password ? (
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
          </Box>
        </HStack>
      </Box>
    </>
  );
}

export default RequireAuth(Profile);
