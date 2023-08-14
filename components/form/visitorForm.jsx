import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import { visitorSchima } from "../../Schima";
import axios from "axios";
import { baseURL } from "../../utility/baseURL";

function VisitorForm({realestate,onClose}) {
  const toast = useToast()
  const initialData = {
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    real_estate:realestate.id
  };
  const {
    values,
    handleBlur,
    handleChange,
    touched,
    errors,
    handleReset,
    handleSubmit,
  } = useFormik({
    initialValues: initialData,
    validationSchema: visitorSchima,
    onSubmit: (values) => {
      console.log(values);
      axios.post(baseURL+'/visitor-request/',values,)
      .then(res=>{
        console.log(res)
        toast({
          title: "Request Send Successfully.After Approve we Will Nofity you",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      })
      .catch(err=>{
        console.log(err.response)
        toast({
          title: err.response.data.non_field_errors[0],
          status: "error",
          duration: 2000,
          isClosable: true,
        })
        onClose()
      })
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={errors.first_name && touched.first_name}>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={values.first_name}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength="10"
        />
        {errors.first_name && touched.first_name ? (
          <FormErrorMessage>{errors.first_name}.</FormErrorMessage>
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
          maxLength="10"
        />
        {errors.last_name && touched.last_name ? (
          <FormErrorMessage>{errors.last_name}.</FormErrorMessage>
        ) : null}
      </FormControl>

      <FormControl isInvalid={errors.email && touched.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
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
      <button
        type="submit"
        className="w-full mt-4 text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
}

export default VisitorForm;
