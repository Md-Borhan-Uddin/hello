import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { countrySchima } from "../../Schima";
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { editItem } from "../../utility/country_city";
import { getUser } from "../../utility/authentication";
import { baseURL } from "../../utility/baseURL";

function CountryForm({
  countryOnClose,
  isEdit,
  id,
  country,
  countries,
  setCountries,
}) {
  const { access_token } = getUser();
  const toast = useToast();
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  const countrydata = {
    name: "",
    is_active: false,
  };
  const [customerror, setcustomerror] = useState({});
  const {
    values: countriesValues,
    errors: countriesErrors,
    setValues: countriesSetValues,
    handleChange: countryHandleChange,
    handleSubmit: countryHandleSubmit,
    handleReset: countryHandleReset,
    touched: countryTouched,
    handleBlur: countryHandleBlur,
  } = useFormik({
    initialValues: countrydata,
    validationSchema: countrySchima,
    onSubmit: (values, { setSubmitting }) => {
      axios
        .post(baseURL + "/country/", values, {
          headers: headers,
        })
        .then((res) => {
          setCountries([...countries, res.data]);

          toast({
            title: "countries Add Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((error) => {
          setcustomerror(error.response.data);
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
      countryHandleReset();
      countryOnClose();
    },
  });

  useEffect(() => {
    if (isEdit) {
      countriesSetValues({
        name: country[0]?.name,
        is_active: country[0]?.is_active,
      });
    }
  }, [isEdit]);

  const countryUpdate = (e) => {
    e.preventDefault();
    const res = editItem(
      "/country/",
      headers,
      id,
      countriesValues,
      setCountries,
      countries,
      toast
    );

    countryOnClose();
  };

  return (
    <form className="space-y-3 md:space-y-4" onSubmit={countryHandleSubmit}>
      <FormControl isInvalid={countriesErrors.name && countryTouched.name}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="countries Name"
          value={countriesValues.name}
          onChange={countryHandleChange}
          onBlur={countryHandleBlur}
          maxLength="20"
        />
        {countriesErrors.name && countryTouched.name ? (
          <FormErrorMessage>{countriesErrors.name}.</FormErrorMessage>
        ) : null}
        {customerror.name ? (
          <p className="text-red-600">{customerror.name.message}.</p>
        ) : null}
      </FormControl>
      <FormControl isInvalid={countriesErrors.is_active}>
        <Checkbox
          onChange={countryHandleChange}
          name="is_active"
          isChecked={
            countriesValues.is_active ? countriesValues.is_active : false
          }
          value={countriesValues.is_active}
        >
          Active
        </Checkbox>
        {countriesErrors.is_active && countryTouched.is_active ? (
          <FormErrorMessage>{countriesErrors.is_active}.</FormErrorMessage>
        ) : null}
        {customerror.is_active ? (
          <p className="text-red-600">{customerror.is_active.message}.</p>
        ) : null}
      </FormControl>
      {isEdit ? (
        <button
          className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={countryUpdate}
        >
          Update
        </button>
      ) : (
        <button
          type="submit"
          className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          // disabled={isSubmitting}
        >
          Save
        </button>
      )}
    </form>
  );
}

export default CountryForm;
