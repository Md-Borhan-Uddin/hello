import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import CustomModal from "../../../components/UserEditModal";
import { useFormik } from "formik";
import { assetSchima } from "../../../Schima";
import axios from "axios";
import { baseURL } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication"
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../../../utility/category_brand";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import DeleteButton from "../../../components/deleteButton";


const inputdata = {
  brand: "",
  type: "",
};

function Assert() {
  const [assets, setAssets] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id,setId] = useState()
  const router = useNavigate();
  const toast = useToast();
  const [customerror, setcustomerror] = useState({});
 
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
      
      axios
        .post(baseURL + "/asset/", values, {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
          // setBrands([...brands, res.data]);
          setAssets([...assets,res.data])
          console.log(assets)
          
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
            router("/login");
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
    
  }, []);
  

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
      brand: cat[0]?.brand,
      type: cat[0]?.type,
    });
  };

 
  const assetUpdate = (e) => {
    e.preventDefault();
    axios
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
      console.log(error);
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
                      {item?.type}
                    </td>
                    <td className="px-6 py-4">
                    {item?.brand}
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
          <FormControl isInvalid={errors.type}>
            <FormLabel>Category</FormLabel>
            <Input 
            placeholder="Category" 
            name="type" 
            value={values.type} 
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength='20'
            />
              
            {errors.type && touched.type ? (
              <FormErrorMessage>{errors.type}.</FormErrorMessage>
            ) : null}
            {customerror.type ? (
              <p className="text-red-600">{customerror.type.message}.</p>
            ) : null}
          </FormControl>
          <FormControl isInvalid={errors.brand && touched.brand}>
          <Input 
          placeholder="Select Brand" 
          name="brand" 
          value={values.brand} 
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength='20'
          />
            
            {errors.brand && touched.brand ? (
              <FormErrorMessage>{errors.is_active}.</FormErrorMessage>
            ) : null}
            {customerror.brand ? (
              <p className="text-red-600">{customerror.brand.message}.</p>
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