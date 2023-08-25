import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  ModalFooter,
  Textarea,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utility/authentication";
import { baseUrl } from "../../utility/baseURL";
import { scheduleSchima } from "../../Schima";

const inputdata = {
  name: "",
  description: "",
  real_estate_id: "",
  asset_id: "",
  is_reminder: false,
  maintain_date: "",
  reminder_date: "",
  status: "Active",
  invoice_file: "",
};

function ScheduleForm({ onClose, isEdit, id,editItem }) {
  const [realestate, setrealestate] = useState([]);
  const [asset, setAsset] = useState([]);
  const router = useNavigate();
  const toast = useToast();
  const { access_token, userType } = getUser();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  

  useEffect(() => {
    if(isEdit && editItem){
        setValue(editItem)
    }
    axios
      .get(baseUrl.defaults.baseURL + `/realestate/${userType}/`, {
        headers: headers,
      })
      .then((res) => {
        setrealestate(res.data.results);
      })
      .catch((error) => {
        if (error.response.status == 404) {
          toast({
            title: "You don't have Registered Real Estate",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          onClose();
        }
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
    handleBlur,
  } = useFormik({
    initialValues: inputdata,
    validationSchema: scheduleSchima,
    onSubmit: (values, { setSubmitting }) => {
      axios
        .post(baseUrl.defaults.baseURL + "/schedule-maintain/", values, {
          headers: headers,
        })
        .then((res) => {
          console.log("data", res.data);

          if (res.status == 201) {
            getObject("schedule-maintain")
              .then((res) => {
                setSchedules(res.data.results);
              })
              .catch((error) => console.log(error));

            toast({
              title: "The Schedule Maintenance is Created Successfully",
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
  const getAsset = (id)=>{
    axios
      .get(baseUrl.defaults.baseURL + `/asset-by/${id}/`, { headers: headers })
      .then((res) => {
        setAsset(res.data);
      })
      .catch((error) => {
        if (error.response.status == 404) {
          toast({
            title: "You don't have Registered Real Estate",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          onClose();
        }
      });
  }

  const handleEstateChange = (e) => {
    const { value: id } = e.target;
    setFieldValue("real_estate_id", id);
    getAsset(id)
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(baseUrl.defaults.baseURL + `/schedule-maintain/${id}/`, values, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        getObject("schedule-maintain")
          .then((res) => setSchedules(res.data))
          .catch((error) => console.log(error));
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

  const setValue = (data)=>{
    getAsset(data?.real_estate.id)
    setValues({
        name: data?.name,
        description: data?.description,
        real_estate_id: data?.real_estate.id,
        asset_id: data?.asset.id,
        is_reminder: data?.is_remainder ? "true" : false,
        maintain_date: data?.maintain_date,
        reminder_date: data?.reminder_date,
        status: data?.status,
        invoice_file: data?.invoice_file,
        
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <FormControl isInvalid={errors.real_estate_id}>
          <FormLabel
            color="secondary.600"
            fontWeight="semibold"
            fontSize="0.9rem"
          >
            Real Estate
          </FormLabel>
          <Select
            placeholder="Select Real Estate"
            name="duration_date"
            value={values.real_estate_id}
            onChange={handleEstateChange}
            onBlur={handleBlur}
          >
            {realestate.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          {errors.real_estate_id && touched.real_estate_id ? (
            <FormErrorMessage>{errors.real_estate_id}</FormErrorMessage>
          ) : null}
        </FormControl>
      </Box>
      <Box mb={2}>
        <FormControl isInvalid={errors.asset_id}>
          <FormLabel
            color="secondary.600"
            fontWeight="semibold"
            fontSize="0.9rem"
          >
            Asset
          </FormLabel>
          <Select
            placeholder="Select Asset"
            name="asset_id"
            value={values.asset_id}
            onBlur={handleBlur}
            onChange={(e) => setFieldValue("asset_id", e.target.value)}
          >
            {asset.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          {errors.asset_id && touched.asset_id ? (
            <FormErrorMessage>{errors.asset_id}</FormErrorMessage>
          ) : null}
        </FormControl>
      </Box>

      <HStack mb={2}>
        <FormControl isInvalid={errors.name}>
          <FormLabel
            color="secondary.600"
            fontWeight="semibold"
            fontSize="0.9rem"
          >
            Schedule Name
          </FormLabel>
          <Input
            placeholder="Schedule name"
            onChange={handleChange}
            name="name"
            value={values.name}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? (
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl isInvalid={errors.is_reminder}>
          <FormLabel
            color="secondary.600"
            fontWeight="semibold"
            fontSize="0.9rem"
          >
            Start Schedule Reminder
          </FormLabel>
          <RadioGroup
            value={values.is_reminder}
            onChange={(e) => setFieldValue("is_reminder", e)}
            name="is_reminder"
            onBlur={handleBlur}
          >
            <HStack>
              <Radio value="true" colorScheme="primary">
                Yes
              </Radio>
              <Radio value="false" colorScheme="primary">
                No
              </Radio>
            </HStack>
          </RadioGroup>
          {errors.is_reminder && touched.is_reminder ? (
            <FormErrorMessage>{errors.is_reminder}</FormErrorMessage>
          ) : null}
        </FormControl>
      </HStack>

      <HStack mb={2}>
        <FormControl isInvalid={errors.maintain_date}>
          <FormLabel
            color="secondary.600"
            fontWeight="semibold"
            fontSize="0.9rem"
          >
            Maintain Date
          </FormLabel>
          <Input
            placeholder="Maintain Date"
            onChange={handleChange}
            name="maintain_date"
            value={values.maintain_date}
            type="date"
            onBlur={handleBlur}
            min={new Date().toISOString().slice(0, 10)}
          />
          {errors.maintain_date && touched.maintain_date ? (
            <FormErrorMessage>{errors.maintain_date}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl isInvalid={errors.reminder_date}>
          <FormLabel
            color="secondary.600"
            fontWeight="semibold"
            fontSize="0.9rem"
          >
            Reminder Date
          </FormLabel>
          <Input
            onChange={handleChange}
            name="reminder_date"
            value={values.reminder_date}
            type="date"
            onBlur={handleBlur}
            min={new Date().toISOString().slice(0, 10)}
          />
          {errors.reminder_date && touched.reminder_date ? (
            <FormErrorMessage>{errors.reminder_date}</FormErrorMessage>
          ) : null}
        </FormControl>
      </HStack>

      <Box mb={2}>
        <FormControl isInvalid={errors.description}>
          <FormLabel
            color="secondary.600"
            fontWeight="semibold"
            fontSize="0.9rem"
          >
            Schedule Description
          </FormLabel>
          <Textarea
            placeholder="Schedule Description"
            onChange={handleChange}
            name="description"
            value={values.description}
            onBlur={handleBlur}
          ></Textarea>
          {errors.description && touched.description ? (
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          ) : null}
        </FormControl>
      </Box>

      {isEdit && (
        <HStack mb={2}>
          <FormControl isInvalid={errors.invoice_file}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Related Invoice
            </FormLabel>
            <Input
              placeholder="Invoice"
              onChange={handleChange}
              name="invoice_file"
              value={values.invoice_file}
              type="file"
              onBlur={handleBlur}
            />
            {errors.invoice_file && touched.invoice_file ? (
              <FormErrorMessage>{errors.invoice_file}</FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isInvalid={errors.real_estate_id}>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Real Estate
            </FormLabel>
            <Select
              placeholder="Schedule Statue"
              name="status"
              value={values.status}
              onChange={handleEstateChange}
              onBlur={handleBlur}
            >
              <option value="Active">Active</option>
              <option value="Cancele">Cancele</option>
              <option value="Done">Done</option>
            </Select>
            {errors.status && touched.status ? (
              <FormErrorMessage>{errors.status}</FormErrorMessage>
            ) : null}
          </FormControl>
        </HStack>
      )}

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
        {isEdit ? (
          <Button
            onClick={handleUpdate}
            variant="outline"
            colorScheme="primary"
            transition="ease-in-out 0.5s"
            _hover={{ bgColor: "primary.600", color: "#fff" }}
          >
            Update
          </Button>
        ) : (
          <Button
            type="submit"
            variant="outline"
            colorScheme="primary"
            transition="ease-in-out 0.5s"
            _hover={{ bgColor: "primary.600", color: "#fff" }}
          >
            Save
          </Button>
        )}
      </ModalFooter>
    </form>
  );
}

export default ScheduleForm;
