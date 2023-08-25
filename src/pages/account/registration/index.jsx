import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registrationSchima } from "../../../../Schima";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

import { useUserRegistrationMutation } from "../../../../data/auth/service/authServices";
import { butifyErrors } from "../../../../utility/utlity";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../../../../data/auth/slice/activeUserSlice";
const getText = React.lazy(()=>import("../../../../components/cptcha/text_generate"));
const Captcha = React.lazy(()=>import("../../../../components/cptcha/Captcha"));

const inputdata = {
  first_name: "",
  last_name: "",
  middle_name: "",
  username: "",
  email: "",
  mobile_number: "",
  password: "",
  password2: "",
};

export default function Registration() {
  const [captchaError, setcaptchaError] = useState([]);
  const [captchaMatch, setCaptchaMatch] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchtext, setCaptchtext] = useState("");
  const toast = useToast();

  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.activeUser);
  const [registerUser, { isError, isLoading, isSuccess, error }] =
    useUserRegistrationMutation();

  const router = useNavigate();

  useEffect(() => {
    setCaptchtext(getText(6));
    dispatch(setActiveUser({ token: token, user: user }));
    if (token) {
      router.push("/profile");
    }
  }, [token]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: inputdata,
    validationSchema: registrationSchima,
    onSubmit: async (values, { setSubmitting }) => {
      if (captcha === "") {
        setCaptchaMatch(true);
        setcaptchaError(["Captch field Not Empty"]);
      }
      if (captcha != captchtext) {
        setCaptchaMatch(true);
        setcaptchaError(["Captch Not Match"]);
        reFreshCaptcha();
      } else {
        try {
          const res = await registerUser(values);
          if (res.data) {
            toast({
              description: "Activation Link Send Your Email",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            // useDispatch(setToken(getUser()))
            router("/login");
          }
          if (res.error) {
            const e = butifyErrors(res.error.data);
            setcustomerror(e);
            setValues({
              first_name: values.first_name,
              last_name: values.last_name,
              middle_name: values.middle_name,
              username: values.username,
              email: values.email,
              mobile_number: values.mobile_number,
              password: values.password,
              password2: values.password2,
            })
            window.scrollTo(0, 0);
          }
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
  });

  const reFreshCaptcha = () => setCaptchtext(getText(6));

  const handleCaptcha = (e) => {
    setCaptcha(e.target.value);
  };

  const [customerrors, setcustomerror] = useState([]);

  if (token) return null;
  const pageContent = isLoading ? (
    <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="secondary.200"
        color="primary.500"
        size="xl"
      />
    </Flex>
  ) : (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-lg  dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create An Account
            </h1>

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
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength='20'
                  />
                  {errors.username && touched.username ? (
                    <FormErrorMessage>{errors.username}.</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl isInvalid={errors.password && touched.password}>
                  <FormLabel>Password</FormLabel>
                  <HStack gap={"0.5rem"}>
                    <Input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength='20'
                      minLength='8'
                    />
                    <Tooltip
                      borderRadius={"base"}
                      hasArrow
                      label={
                        <Flex py={"1rem"} flexDirection={"column"} gap={0}>
                          <span m={0} p={0}>
                            Between 8-20 characters
                          </span>
                          <span m={0} p={0}>
                            Have at least one number(0-9)
                          </span>
                          <span m={0} p={0}>
                            Have at least one upper case letter(A-Z)
                          </span>
                          <span m={0} p={0}>
                            Have at least one lower case letter(a-z)
                          </span>
                          <span m={0} p={0}>
                            Have at least one symbol(!,@,#,$,&,*)
                          </span>
                        </Flex>
                      }
                    >
                      <InfoIcon />
                    </Tooltip>
                  </HStack>
                  {errors.password && touched.password ? (
                    <FormErrorMessage>{errors.password}.</FormErrorMessage>
                  ) : null}
                </FormControl>
              </div>
              <div className="grid md:grid-cols-2 md:gap-3">
                <FormControl isInvalid={errors.password2 && touched.password2}>
                  <FormLabel>Re-Password</FormLabel>
                  <Input
                    type="password"
                    name="password2"
                    placeholder="Re-Password"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength='20'
                    minLength='8'
                  />
                  {errors.password2 && touched.password2 ? (
                    <FormErrorMessage>{errors.password2}.</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl
                  isInvalid={errors.first_name && touched.first_name}
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength='10'
                  />
                  {errors.first_name && touched.first_name ? (
                    <FormErrorMessage>{errors.first_name}.</FormErrorMessage>
                  ) : null}
                </FormControl>
              </div>
              <div className="grid md:grid-cols-2 md:gap-3">
                <FormControl
                  isInvalid={errors.middle_name && touched.middle_name}
                >
                  <FormLabel>Middle Name</FormLabel>
                  <Input
                    type="text"
                    name="middle_name"
                    placeholder="Middle Name"
                    value={values.middle_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength='10'
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
                    maxLength='10'
                  />
                  {errors.last_name && touched.last_name ? (
                    <FormErrorMessage>{errors.last_name}.</FormErrorMessage>
                  ) : null}
                </FormControl>
              </div>
              <div className="grid md:grid-cols-2 md:gap-3">
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel>Email</FormLabel>
                  <HStack>
                    <Input
                      type="text"
                      name="email"
                      placeholder="info@daimn.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength='50'
                    />
                    <Tooltip
                      borderRadius={"base"}
                      hasArrow
                      label={
                        'Example: yourmail@daimn.com'
                      }
                    >
                      <InfoIcon />
                    </Tooltip>

                  </HStack>
                  {errors.email && touched.email ? (
                    <FormErrorMessage>{errors.email}.</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl
                  isInvalid={errors.mobile_number && touched.mobile_number}
                >
                  <FormLabel>Mobile Number</FormLabel>
                  <HStack>
                    <Input
                      type="text"
                      name="mobile_number"
                      placeholder="+919876543210"
                      value={values.mobile_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Tooltip
                      borderRadius={"base"}
                      hasArrow
                      label={
                        'Example: +919876543210'
                      }
                    >
                      <InfoIcon />
                    </Tooltip>

                  </HStack>
                  {errors.mobile_number && touched.mobile_number ? (
                    <FormErrorMessage>{errors.mobile_number}.</FormErrorMessage>
                  ) : null}
                </FormControl>
              </div>
              <Captcha
                value={captcha}
                text={captchtext}
                onChange={handleCaptcha}
                onClick={reFreshCaptcha}
                error_msg={captchaError}
                is_match={captchaMatch}
              />
              <button
                type="submit"
                className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 underline dark:text-blue-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  return pageContent;
}
