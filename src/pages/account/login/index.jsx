import getText from "../../../../components/cptcha/text_generate";
import Captcha from "../../../../components/cptcha/Captcha";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { loginSchima } from "../../../../Schima";
import { Formik } from "formik";
import { getUser, setUser } from "../../../../utility/authentication";
import { useUserLoginMutation } from "../../../../data/auth/service/authServices";
import { butifyErrors } from "../../../../utility/utlity";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../../../../data/auth/slice/activeUserSlice";
import { setLoginUser } from "../../../../data/auth/slice/userSlice";

export default function Login() {
  const router = useNavigate();
  const [error, setErrors] = useState([]);
  const [captchaMatch, setCaptchaMatch] = useState(false);
  const [captchtext, setCaptchtext] = useState("");
  const reFreshCaptcha = () => setCaptchtext(getText(6));
  const [captcha, setCaptcha] = useState("");
  
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.activeUser);

  const [login, { isLoading }] = useUserLoginMutation();

  useEffect(() => {
    setCaptchtext(getText(6));

    dispatch(setActiveUser({ token: token, user: user }));
    if (token) {
      router("/dashboard");
    }
  }, [token]);

  const captchaHandle = (e) => {
    setCaptcha(e.target.value);
  };
  const inputdata = {
    username: "",
    password: "",
  };
  const [customerrors, setcustomerror] = useState([]);

  if (token) return null;

  return (

      <div className="flex items-center justify-center h-[calc(100vh-68px)] ">
        <div className="shadow-lg w-3/4 sm:w-1/2 md:w-1/3 p-4 rounded-md dark:bg-gray-950">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-secondary md:text-2xl dark:text-white dark:bg-gray-950 text-center mb-3">
            Login Form
          </h2>

          {error.message ? (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{error.message}.</AlertDescription>
            </Alert>
          ) : null}
          <Formik
            initialValues={inputdata}
            validationSchema={loginSchima}
            onSubmit={async (values, { setSubmitting }) => {
              if (captcha != captchtext) {
                setCaptchaMatch(true);
                setErrors(["Captch Not Match"]);
                reFreshCaptcha();
              } else {
                setCaptchaMatch(false);
                setErrors([]);
                const res = await login(values);
                if (res.data) {
                  setUser(res.data);
                  dispatch(
                    setActiveUser({
                      token: getUser().access_token,
                      user: res.data.user,
                    })
                  );
                  dispatch(setLoginUser({user: res.data.user}))

                  router("/dashboard");
                }
                if (res.error) {
                  const e = butifyErrors(res.error.data);

                  setcustomerror(e);
                  window.scrollTo(0, 0);
                  reFreshCaptcha();
                }
              }
              setCaptcha("");
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
              /* and other goodies */
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
                <FormControl isInvalid={errors.username && touched.username}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username ? (
                    <FormErrorMessage>{errors.username}.</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl isInvalid={errors.password && touched.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <FormErrorMessage>{errors.password}.</FormErrorMessage>
                  ) : null}
                </FormControl>
                <Captcha
                  value={captcha}
                  text={captchtext}
                  onChange={captchaHandle}
                  onClick={reFreshCaptcha}
                  error_msg={error}
                  is_match={captchaMatch}
                />
                <div className="flex items-start justify-between mb-3">
                  <Link
                    to="/forget-password"
                    className="ml-2 text-sm font-medium cursor-pointer text-secondary underline dark:text-gray-300"
                  >
                    Forget Password
                  </Link>
                </div>
                <div className="flex flex-col-reverse gap-4 justify-between items-center sm:flex-row">
                  <Link
                    to="/registration"
                    className=" bg-[rgb(34,220,118)] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  >
                    Create Account
                  </Link>

                  <button
                    type="submit"
                    className="text-secondary bg-[rgb(34,220,118)] hover:bg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  >
                    Login
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
  
  );
}
