import React, { useEffect, useRef, useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import SearchBox from "../../../components/SearchBox";
import CustomModal from "../../../components/UserEditModal";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL, baseUrl } from "../../../utility/baseURL";
import { Formik, useFormik } from "formik";
import { userEditSchima } from "../../../Schima/index";
import { getUser } from "../../../utility/authentication";
import Paginator from "../../../components/Paginator";
import {useNavigate} from 'react-router-dom'

function UserList() {
  const router = useNavigate()
  const toast = useToast();
  const [customerror, setcustomerror] = useState({});
  const [error, setErrors] = useState([]);
  const [user, setUser] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [previousUrl, setPreviousUrl] = useState(null)
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();
  const {
    isOpen: statusIsOpen,
    onOpen: statusOnOpen,
    onClose: statusOnClose,
  } = useDisclosure();
  const [userSearch, setUserSearch] = useState("");
  const [users, setusers] = useState([]);
  const [status, setStatus] = useState(false);
  const { access_token } = getUser();

  const userid = useRef();
  const statusCheck = useRef();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  const handlePageChange = (url,action)=>{
    console.log('change')
    axios.get(url, {headers:headers})
      .then((res) =>{
        if(action==='next'){
          setCurrentPage(currentPage+1)
        }
        if(action==='previous'){
          setCurrentPage(currentPage-1)
        }
        setNextUrl(res.data.next)
        setPreviousUrl(res.data.previous)
        setTotalItems(res.data.count)
      })
      .catch((error) => console.log(error));
  }

  const fetchdata = (id, values, message) => {
    console.log(values);
    axios
      .patch(baseUrl.defaults.baseURL + `/user-edit/${id}/`, values, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        if (message) {
          toast({
            title: "update Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        // setcustomerror(error.response.data);
        console.log(error);
        if (error.response.status == 401) {
          toast({
            title: "you are Not Login Please login",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          router("/login");
        }
      });
  };
  useEffect(()=>{
    axios.get(baseURL+'/all-user/',{headers:headers})
    .then((res)=>{
      setUser(res.data.results)
      setNextUrl(res.data.next)
      setPreviousUrl(res.data.previous)
      setTotalItems(res.data.count)
      console.log('data',res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])

  const {
    values,
    errors,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: inputdata,
    validationSchema: userEditSchima,
    onSubmit: (values, { setSubmitting }) => {
      console.log(userid.current.value);
      const { value } = userid.current;

      fetchdata(value, values, true);
      onClose();
      window.location.reload();
    },
  });

  const statusHandler = (e) => {
    console.log(e);
    const { value, checked } = e.target;
    setStatus(!checked);
    if (value) {
      console.log("data");
      statusOnOpen();
      fetchdata(value, {});
    } else {
      const { value } = userid.current;
      const { checked } = statusCheck.current;
      fetchdata(value, { is_active: !checked }, true);
      statusOnClose();
      console.log("save", e);
      window.location.reload();
    }
  };
  const searchHandle = (e) => {
    // setUserSearch(e.target.value)
    // setusers(users.filter((item)=>item.username.toLowerCase().includes(e.target.value)))
  };
  const handleDelete = () => {
    const { value } = userid.current;

    axios
      .delete(baseUrl.defaults.baseURL + `/user-delete/${value}/`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);

        toast({
          title: "Delete Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        // setcustomerror(error.response.data);
        console.log(error);
        if (error.response.status == 401) {
          toast({
            title: "you are Not Login Please login",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          router("/login");
        }
      });
    editOnClose();
    // window.location.reload()
  };

  const handleEdit = (e) => {
    const { value } = e.target;
    axios
      .patch(
        baseUrl.defaults.baseURL + `/user-edit/${value}/`,
        {},
        { headers: headers }
      )
      .then((res) => {
        console.log(res.data);
        const { data } = res;
        setValues({
          first_name: data?.first_name,
          last_name: data?.last_name,
          middel_name: data.middel_name ? data.middel_name : "",
          email: data?.email,
          mobile_number: data?.mobile_number.slice(
            3,
            data.mobile_number.length
          ),
        });
        editOnOpen();
      })
      .catch((error) => {
        // setcustomerror(error.response.data);
        console.log(error);

        if (error.response.status == 401) {
          toast({
            title: "you are Not Login Please login",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          router("/login");
        }
      });
  };
  // console.log('user',user)

  return (
    <>
      
        
        <div className="py-2">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 px-3">
            <div className="py-4 bg-white dark:bg-gray-900">
              <SearchBox handler={searchHandle} />
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mobile
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Type
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
                {user.map((item, i) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={i}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.username}
                      </th>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.mobile_number}</td>
                      <td className="px-6 py-4">{item.user_type}</td>
                      <td className="px-6 py-4">
                        <label className="relative inline-flex items-center mb-4 cursor-pointer">
                          <input
                            type="checkbox"
                            value={item.id}
                            onChange={statusHandler}
                            className="sr-only peer"
                            checked={item.is_active}
                            ref={statusCheck}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={handleEdit}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          value={item.id}
                          ref={userid}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Box>
            <Paginator handleNextPage={()=>handlePageChange(nextUrl, 'next')} handlePreviousPage={()=>handlePageChange(previousUrl, 'previous')} isNext={nextUrl} isPrevious={previousUrl} totalItem={totalItems} page={currentPage} />
          </Box>
        </div>
      <CustomModal
        isOpen={editIsOpen}
        onClose={editOnClose}
        closeOnOverlayClick={false}
        title="Edit User"
        isFooter={true}
        cancelBtnLabel="Cancel"
        deleteBtnLable="Delete"
        handleDelete={handleDelete}
      >
        <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-3">
            <FormControl isInvalid={errors.first_name}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={values.first_name}
                onChange={handleChange}
              />
              {errors.first_name && touched.first_name ? (
                <FormErrorMessage>{errors.first_name}.</FormErrorMessage>
              ) : null}
              {customerror.first_name ? (
                <p className="text-red-600">
                  {customerror.first_name.message}.
                </p>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.last_name}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={values.last_name}
                onChange={handleChange}
              />
              {errors.last_name && touched.last_name ? (
                <FormErrorMessage>{errors.last_name}.</FormErrorMessage>
              ) : null}
              {customerror.last_name ? (
                <p className="text-red-600">{customerror.last_name.message}.</p>
              ) : null}
            </FormControl>
          </div>

          <div className="grid md:grid-cols-2 md:gap-3">
            <FormControl isInvalid={errors.middel_name}>
              <FormLabel>Middle Name</FormLabel>
              <Input
                type="text"
                name="middel_name"
                placeholder="Middle Name"
                value={values.middel_name}
                onChange={handleChange}
              />
              {errors.middel_name && touched.middel_name ? (
                <FormErrorMessage>{errors.middel_name}.</FormErrorMessage>
              ) : null}
              {customerror.middel_name ? (
                <p className="text-red-600">
                  {customerror.middel_name.message}.
                </p>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email ? (
                <FormErrorMessage>{errors.email}.</FormErrorMessage>
              ) : null}
              {customerror.email ? (
                <p className="text-red-600">{customerror.email.message}.</p>
              ) : null}
            </FormControl>
          </div>

          <div className="grid md:grid-cols-2 md:gap-3">
            <FormControl isInvalid={errors.mobile_number}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                type="number"
                name="mobile_number"
                placeholder="Mobile Number"
                value={values.mobile_number}
                onChange={handleChange}
              />
              {errors.mobile_number && touched.mobile_number ? (
                <FormErrorMessage>{errors.mobile_number}.</FormErrorMessage>
              ) : null}
              {customerror.mobile_number ? (
                <p className="text-red-600">
                  {customerror.mobile_number.message}.
                </p>
              ) : null}
            </FormControl>
          </div>

          <button
            type="submit"
            className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            // disabled={isSubmitting}
          >
            Update
          </button>
        </form>
      </CustomModal>

      <CustomModal
        isOpen={statusIsOpen}
        onClose={statusOnClose}
        closeOnOverlayClick={false}
        title="Edit User"
        isFooter={true}
        cancelBtnLabel="Cancel"
        saveBtnLabel={status ? "Deactivate" : "Active"}
        handleSave={statusHandler}
      >
        <p>do you want to change User Active Status</p>
      </CustomModal>
    </>
  );
}


export default UserList





const inputdata = {
  first_name: "",
  last_name: "",
  middel_name: "",
  email: "",
  mobile_number: "",
};
