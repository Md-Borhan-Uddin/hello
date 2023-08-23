import React, { useEffect, useState } from "react";
import { getUser } from "../../utility/authentication";
import { useFormik } from "formik";
import { citySchima } from "../../Schima";
import { editItem } from "../../utility/country_city";
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../../utility/baseURL";

function CityForm({
  cityOnClose,
  isEdit,
  id,
  city,
  cities,
  countries,
  setCities,
}) {
  const citydata = {
    name: "",
    country_id: "",
    is_active: false,
  };
  const toast = useToast();
  const [customerror, setcustomerror] = useState({});

  const { access_token } = getUser();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  const {
    values: citiesValues,
    errors: citiesErrors,
    setValues: citySetValues,
    handleChange: cityHandleChange,
    handleSubmit: cityHandleSubmit,
    handleReset: cityHandleReset,
    setValues: citySetFieldValues,
    touched: cityTouched,
    handleBlur: cityHandleBlur,
  } = useFormik({
    initialValues: citydata,
    validationSchema: citySchima,
    onSubmit: (citiesValues, { setSubmitting }) => {
      axios
        .post(baseURL + "/city/", citiesValues, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          setCities([...cities, res.data]);
        })
        .catch((error) => {
          console.log(error);
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
            router.push("/account/login");
          }
          // countriesHandleReset()
          // countriesOnClose();
        });
      cityHandleReset();
      cityOnClose();
    },
  });

  useEffect(() => {
    cityHandleReset()
    if (isEdit) {
      citySetFieldValues({
        country_id: city[0]?.country.id,
        name: city[0]?.name,
        is_active: city[0]?.is_active,
      });
    }
  }, [isEdit]);

  const cityUpdate = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const res = editItem(
      `/city/edit/`,
      headers,
      id,
      citiesValues,
      setCities,
      cities,
      toast
    );

    cityOnClose();
  };


  return (
    <form className="space-y-3 md:space-y-4" onSubmit={cityHandleSubmit}>
      <FormControl
        isInvalid={citiesErrors.country_id && cityTouched.country_id}
      >
        <Select
          placeholder="Select Country"
          name="country_id"
          value={citiesValues.country_id}
          onChange={cityHandleChange}
        >
          {countries.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        {citiesErrors.country && cityTouched.country ? (
          <FormErrorMessage>{citiesErrors.country}.</FormErrorMessage>
        ) : null}
        {customerror.country ? (
          <p className="text-red-600">{customerror.country.message}.</p>
        ) : null}
      </FormControl>
      <FormControl isInvalid={citiesErrors.name && cityTouched.name}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="cities Name"
          value={citiesValues.name}
          onChange={cityHandleChange}
          onBlur={cityHandleBlur}
          maxLength="20"
        />
        {citiesErrors.name && cityTouched.name ? (
          <FormErrorMessage>{citiesErrors.name}.</FormErrorMessage>
        ) : null}
        {customerror.name ? (
          <p className="text-red-600">{customerror.name.message}.</p>
        ) : null}
      </FormControl>

      <FormControl isInvalid={citiesErrors.is_active && cityTouched}>
        <Checkbox
          onChange={cityHandleChange}
          name="is_active"
          isChecked={citiesValues.is_active ? citiesValues.is_active : false}
          value={citiesValues.is_active}
        >
          Active
        </Checkbox>
        {citiesErrors.is_active && cityTouched.is_active ? (
          <FormErrorMessage>{citiesErrors.is_active}.</FormErrorMessage>
        ) : null}
        {customerror.is_active ? (
          <p className="text-red-600">{customerror.is_active.message}.</p>
        ) : null}
      </FormControl>

      {isEdit ? (
        <button
          className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={cityUpdate}
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

export default CityForm;
