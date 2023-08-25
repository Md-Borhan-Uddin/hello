import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { categoryANDBrandSchima } from "../../../Schima";
import axios from "axios";
import { baseURL } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { deleteItem, editItem, getObjects } from "../../../utility/category_brand";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
const CustomModal = React.lazy(()=>import("../../../components/UserEditModal"));
const DeleteButton = React.lazy(()=>import('../../../components/deleteButton'))





function CategoryBrand() {
  const inputdata = {
    name: "",
    is_active: false,
  };
  const [categorys, setCategorys] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [brands, setBrands] = useState([]);
  const [id,setId] = useState()
  const router = useNavigate();
  const toast = useToast();
  const [customerror, setcustomerror] = useState({});
  const {
    isOpen: categoryIsOpen,
    onClose: categoryOnClose,
    onOpen: categoryOnOpen,
  } = useDisclosure();
  const {
    isOpen: brandIsOpen,
    onClose: brandOnClose,
    onOpen: brandOnOpen,
  } = useDisclosure();
  const { access_token } = getUser();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  const {
    values: categoryValues,
    errors: categoryErrors,
    setValues: categorySetValues,
    handleChange: categoryHandleChange,
    handleSubmit: categoryHandleSubmit,
    handleReset: categoryHandleReset,
    touched: categoryTouched,
    handleBlur:categoryHandleBlur
  } = useFormik({
    initialValues: inputdata,
    validationSchema: categoryANDBrandSchima,
    onSubmit: (values, { setSubmitting }) => {
      
      axios
        .post(baseURL + "/assert-type/", values, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          setCategorys([...categorys, res.data]);

          toast({
            title: "Category Add Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error.response.data.non_field_errors);
          setcustomerror(error.response.data)
          if(error.response.data.non_field_errors){
            error.response.data.non_field_errors.map((message)=>{

              toast({
                title: message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            })
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
        });
        categoryHandleReset()
        categoryOnClose();

      //   onClose();
      //   window.location.reload();
    },
  });

  const {
    values: brandValues,
    errors: brandErrors,
    setValues: brandSetValues,
    handleChange: brandHandleChange,
    handleSubmit: brandHandleSubmit,
    handleReset: brandHandleReset,
    touched: brandTouched,
    handleBlur:brandHandleBlur,
  } = useFormik({
    initialValues: inputdata,
    validationSchema: categoryANDBrandSchima,
    onSubmit: (values, { setSubmitting }) => {
      brandHandleReset()
      axios
        .post(baseURL + "/assert-brand/", values, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          setBrands([...brands, res.data]);
          
        })
        .catch((error) => {
          console.log(error);
          setcustomerror(error.response.data)
          if(error.response.data.non_field_errors){
            error.response.data.non_field_errors.map((message)=>{

              toast({
                title: message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            })
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
          // categoryHandleReset()
          // categoryOnClose();
        });
        brandHandleReset()
        brandOnClose();
    },
  });


  useEffect(() => {
    getObjects("/assert-type/", headers, setCategorys);
    getObjects("/assert-brand/", headers, setBrands);
  }, []);

  const categoryEdit = (e) => {
    setIsEdit(true);
    const { value } = e.target;
    setId(value)
    const cat = categorys.filter((e) => e.id == value);
    categoryOnOpen();
    categorySetValues({
      name: cat[0]?.name,
      is_active: cat[0]?.is_active,
    });
  };

  const brandEdit = (e) => {
    setIsEdit(true);
    const { value } = e.target;
    setId(value)
    const cat = brands.filter((e) => e.id == value);

    brandOnOpen();
    brandSetValues({
      name: cat[0]?.name,
      is_active: cat[0]?.is_active,
    });
  };

  const brandUpdate = (e) => {
    e.preventDefault();
    const res = editItem(
      "/assert-brand/",
      headers,
      id,
      brandValues,
      brandSetValues,
      brands,
      toast
    );
    
    brandOnClose();
  };

  const categoryUpdate = (e) => {
    e.preventDefault();
    const res = editItem(
      "/assert-type/",
      headers,
      id,
      categoryValues,
      categorySetValues,
      categorys,
      toast
    );
    
    categoryOnClose();
  };

  const categoryStatus = (e) => {
    const { value, checked } = e.target;
    const res = editItem(
      "/assert-type/",
      headers,
      value,
      {is_active:checked},
      categorySetValues,
      categorys,
      toast
    );
  };

  const brandStatus = (e) => {
    const { value, checked } = e.target;
    const res = editItem(
      "/assert-brand/",
      headers,
      value,
      {is_active:checked},
      brandSetValues,
      brands,
      toast
    );
  };

  const categoryDelete = (id) => {


    const res = deleteItem(
      "/assert-type/",
      headers,
      id,
      setCategorys,
      categorys,
      toast
    );
    
  };

  const brandDelete = (id) => {
    

    const res = deleteItem("/assert-brand/", headers, id, setBrands, brands,toast);
    
  };
  return (
    <>
      <Flex gap={3} overflowX={'auto'}>
      <Box w={{base:'100%',md:'50%'}} pl={'10px'}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0.5rem"}
          >
            <Text as={"h2"} fontSize={"1.3rem"} textAlign={"center"}>
              Category List
            </Text>
            <Button
              onClick={() => {
                categoryHandleReset();
                setIsEdit(false);
                categoryOnOpen();
              }}
              backgroundColor={"rgb(34,220,118)"}
              _hover={{ backgroundColor: "rgb(58, 187, 116)" }}
            >
              Add category
            </Button>
          </Flex>
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categorys.map((item, i) => {
                return (
                  <tr
                    className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">
                      
                        <Switch
                          value={item.id}
                          onChange={categoryStatus}
                          isChecked={item.is_active}
                        />
                    </td>
                    <td className="px-6 py-4">
                      <HStack alignItems={"center"} justifyContent={"center"}>
                        <Button
                          aria-label="editbtn"
                          onClick={categoryEdit}
                          colorScheme="teal"
                          value={item.id}
                          icon={<BiEdit />}
                        >
                          Edit
                        </Button>
                        <DeleteButton handleDelete={categoryDelete} id={item.id}/>
                      </HStack>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
        <Box w={{base:'100%',md:'50%'}} pr={'10px'}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0.5rem"}
          >
            <Text as={"h2"} fontSize={"1.3rem"} textAlign={"center"}>
              Brand List
            </Text>
            <Button
              onClick={()=>{brandHandleReset();setIsEdit(false); brandOnOpen()}}
              backgroundColor={"rgb(34,220,118)"}
              _hover={{ backgroundColor: "rgb(58, 187, 116)" }}
            >
              Add Brand
            </Button>
          </Flex>
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {brands.map((item, i) => {
                return (
                  <tr
                    className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={i}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center">
                    <Switch
                          value={item.id}
                          onChange={brandStatus}
                          isChecked={item.is_active}
                        />
                        
                    </td>
                    <td className="px-6 py-4">
                      <HStack alignItems={"center"} justifyContent={"center"}>
                        <Button
                          aria-label="editbtn"
                          onClick={brandEdit}
                          value={item.id}
                          colorScheme="teal"
                          icon={<BiEdit />}
                        >
                          Edit
                        </Button>

                        
                        <DeleteButton handleDelete={brandDelete} id={item.id}/>
                      </HStack>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Flex>

      {/* category modal */}
      <CustomModal
        isOpen={categoryIsOpen}
        onClose={categoryOnClose}
        closeOnOverlayClick={false}
        title="Category Form"
        isFooter={true}
        cancelBtnLabel="Cancel"
      >
        <form
          className="space-y-3 md:space-y-4"
          onSubmit={categoryHandleSubmit}
        >
          <FormControl isInvalid={categoryErrors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="category Name"
              value={categoryValues.name}
              onChange={categoryHandleChange}
              onBlur={categoryHandleBlur}
              maxLength='20'
            />
            {categoryErrors.name && categoryTouched.name ? (
              <FormErrorMessage>{categoryErrors.name}.</FormErrorMessage>
            ) : null}
            {customerror.name ? (
              <p className="text-red-600">{customerror.name.message}.</p>
            ) : null}
          </FormControl>
          <FormControl isInvalid={categoryErrors.is_active && categoryTouched.is_active}>
            <Checkbox
              onChange={categoryHandleChange}
              name="is_active"
              isChecked={
                categoryValues.is_active ? categoryValues.is_active : false
              }
              value={categorys.is_active}
            >
              Active
            </Checkbox>
            {categoryErrors.is_active && categoryTouched.is_active ? (
              <FormErrorMessage>{categoryErrors.is_active}.</FormErrorMessage>
            ) : null}
            {customerror.is_active ? (
              <p className="text-red-600">{customerror.is_active.message}.</p>
            ) : null}
          </FormControl>
          {isEdit ? (
            <button
              className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={categoryUpdate}
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
      </CustomModal>

      {/* Berand modal */}
      <CustomModal
        isOpen={brandIsOpen}
        onClose={brandOnClose}
        closeOnOverlayClick={false}
        title="Brand From"
        isFooter={true}
        cancelBtnLabel="Cancel"
      >
        <form className="space-y-3 md:space-y-4" onSubmit={brandHandleSubmit}>
          <FormControl isInvalid={brandErrors.name && brandTouched.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="brand Name"
              value={brandValues.name}
              onChange={brandHandleChange}
              onBlur={brandHandleBlur}
              maxLength='20'
            />
            {brandErrors.name && brandTouched.name ? (
              <FormErrorMessage>{brandErrors.name}.</FormErrorMessage>
            ) : null}
            {customerror.name ? (
              <p className="text-red-600">{customerror.name.message}.</p>
            ) : null}
          </FormControl>
          <FormControl isInvalid={brandErrors.is_active}>
            <Checkbox
              onChange={brandHandleChange}
              name="is_active"
              isChecked={brandValues.is_active ? brandValues.is_active : false}
              value={brandValues.is_active}
            >
              Active
            </Checkbox>
            {brandErrors.name && brandTouched.name ? (
              <FormErrorMessage>{brandErrors.name}.</FormErrorMessage>
            ) : null}
            {customerror.name ? (
              <p className="text-red-600">{customerror.name.message}.</p>
            ) : null}
          </FormControl>
          {isEdit ? (
            <button
              className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={brandUpdate}
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
      </CustomModal>
    </>
  );
}


export default RequireAuth(CategoryBrand)