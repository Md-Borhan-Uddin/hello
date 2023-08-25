import React, { useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { changePasswordSchima } from "../../../../Schima";
import { usePasswordResetMutation } from "../../../../data/auth/service/authServices";
import { useNavigate, useParams } from "react-router-dom";
import { butifyErrors } from "../../../../utility/utlity";

export default function PasswordConfirm() {
  const router = useNavigate()
  const params = useParams()
  const toast = useToast()
  const [customerrors, setcustomerror] = useState([]);
  const [passwordReset, { isSuccess, isLoading }] = usePasswordResetMutation();
  const inputdata = {
    confirm_password: "",
    new_password: "",
  };
  return (
    <div className="flex items-center justify-center h-96">
      <div className="shadow-lg w-3/4 sm:w-1/2 md:w-1/3 p-4 rounded-md">
        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center mb-3">
          Confirm Your Password
        </h2>
        <Formik
          initialValues={inputdata}
          validationSchema={changePasswordSchima}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const {uid,token} = params
            const res = await passwordReset({data:values,uid:uid,token:token});
            
            if (res.data) {
              console.log(res.data);
              
              toast({
                description: `${res.data.message}`,
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              router('/login')
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
                  <FormErrorMessage>{errors.new_password}.</FormErrorMessage>
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
                  Update
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}


