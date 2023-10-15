import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { assetSchima } from "../../../Schima";
import axios from "axios";
import { baseURL } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication"
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { deleteItem, getObjects } from "../../../utility/category_brand";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import baseAxios from '../../../utility/axiosConfig'
const DeleteButton = React.lazy(()=>import("../../../components/deleteButton"));
const CustomModal = React.lazy(()=>import("../../../components/UserEditModal"));


const inputdata = {
  brand_id: "",
  type_id: "",
};

function Assert() {
  const [assets, setAssets] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id,setId] = useState()
  const router = useNavigate();
  const toast = useToast();
  const [customerror, setcustomerror] = useState({});
  const [category, setCategory] = useState([])
  const [brands, setBrands] = useState([])
 
  const {
    isOpen,
    onClose,
    onOpen
  } = useDisclosure();
  const { access_token } = getUser();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  const {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    handleReset,
    touched,
    handleBlur
  } = useFormik({
    initialValues: inputdata,
    validationSchema:assetSchima,
    onSubmit: (values, { setSubmitting }) => {
      baseAxios
        .post(baseURL + "/asset/", values, {
          headers: headers,
        })
        .then((res) => {
          setAssets([...assets,res.data])
          
        })
        .catch((error) => {
          console.log(error)
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
            router("/login");
          }
          if (error.response.status == 500) {
            toast({
              title: "somethings wrong try again",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
          // categoryHandleReset()
          // categoryOnClose();
        });
        handleReset()
        onClose();
    },
  });


  useEffect(() => {
    getObjects("/asset/", headers, setAssets);
    
    //get category
    baseAxios.get('/assert-type/',{headers:headers})
    .then(res=>{
      setCategory(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
    //get brand
    baseAxios.get('/assert-brand/',{headers:headers})
    .then(res=>{
      setBrands(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])

  

  const handleAdd = ()=>{
    handleReset();
    setIsEdit(false); 
    onOpen()
  }

  const assetEdit = (e) => {
    setIsEdit(true);
    const { value } = e.target;
    setId(value)
    const cat = assets.filter((e) => e.id == value);
    onOpen();
    setValues({
      brand_id: cat[0]?.brand.id,
      type_id: cat[0]?.type.id,
    });
  };

 
  const assetUpdate = (e) => {
    e.preventDefault();
    baseAxios
    .patch(`${baseURL}/asset/${id}/`, values, {
      headers: headers,
    })
    .then((res) => {
      const { data } = res;
      const obj = assets.map((item) => {
        if (item.id == data.id) {
          item.brand = data?.brand;
          item.type = data?.type;
        }
        return item
      });
      setAssets(obj)
      onClose();
      toast({
        title: "Successfully Update",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    })
    .catch((error) => {
      toast({
        title: "Something wrong try again",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    });
    
    
  };

 
  const assetDelete = (id) => {

    const res = deleteItem("/asset/", headers, id, setAssets, assets,toast);
    
  };
  return (
    <>
      <div className="relative overflow-x-auto mt-3 pr-3">
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0.5rem"}
          >
            <Text as={"h2"} fontSize={"1.3rem"} textAlign={"center"}>
              Asset List
            </Text>
            <Button
              onClick={handleAdd}
              backgroundColor={"rgb(34,220,118)"}
              _hover={{ backgroundColor: "rgb(58, 187, 116)" }}
            >
              Add Asset
            </Button>
          </Flex>
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {assets.map((item, i) => {
                return (
                  <tr
                    className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={i}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item?.type.name}
                    </td>
                    <td className="px-6 py-4">
                    {item?.brand.name}
                    </td>
                    <td className="px-6 py-4">
                      <HStack alignItems={"center"} justifyContent={"center"}>
                        <Button
                          aria-label="editbtn"
                          onClick={assetEdit}
                          value={item?.id}
                          colorScheme="teal"
                          icon={<BiEdit />}
                        >
                          Edit
                        </Button>

                        <DeleteButton handleDelete={assetDelete} id={item.id}/>
                      </HStack>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="relative overflow-x-auto w-1/2 mt-3 pr-3">
          
        </div>

      {/* category modal */}
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        title="Asset Form"
        isFooter={true}
        cancelBtnLabel="Cancel"
      >
        <form
          className="space-y-3 md:space-y-4"
          onSubmit={handleSubmit}
        >
          <FormControl isInvalid={errors.type_id}>
            <FormLabel>Category</FormLabel>
            
            <Select
                placeholder="Category" 
                name="type_id" 
                value={values.type_id} 
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {category.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              
            {errors.type_id && touched.type_id ? (
              <FormErrorMessage>{errors.type_id}.</FormErrorMessage>
            ) : null}
            {customerror.type_id ? (
              <p className="text-red-600">{customerror.type_id.message}.</p>
            ) : null}
          </FormControl>
          <FormControl isInvalid={errors.brand_id && touched.brand_id}>
          
            <Select
                placeholder="Select Brand" 
                name="brand_id" 
                value={values.brand_id} 
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {brands.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            {errors.brand_id && touched.brand_id ? (
              <FormErrorMessage>{errors.brand_id}.</FormErrorMessage>
            ) : null}
            {customerror.brand_id ? (
              <p className="text-red-600">{customerror.brand_id.message}.</p>
            ) : null}
          </FormControl>
          {isEdit ? (
            <button
              className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={assetUpdate}
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



export default RequireAuth(Assert)