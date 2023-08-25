
import { propertyEditSchima } from "../../../Schima";
import { baseURL } from "../../../utility/baseURL";

import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Alert, AlertDescription, AlertIcon, Box, Button, useToast } from "@chakra-ui/react";
import { getUser } from "../../../utility/authentication";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import { getObjects } from "../../../utility/property";
import { blobUrlToFile } from "../../../utility/utlity";
import { useNavigate } from "react-router-dom";

const CurrencyList = React.lazy(()=>import('currency-list'));
const CommonSelect = React.lazy(()=>import("../../../components/CommonForm"));
const InputField = React.lazy(()=>import("../../../components/CommonForm/InputField"));
const InputFormRadio = React.lazy(()=>import("../../../components/CommonForm/InputFormRadio"));



function EditState() {
  const {access_token, userType} = getUser()
  const [country,setCountry] = useState([])
  const [city,setCity] = useState([{ key: "Please select", value: "" }])
  const [currency, setCurrency] = useState([{ key: "Please select", value: "" }])
  const [type, setType] = useState([])
  const [user, setUser] = useState([])
  const router = useNavigate()
  const realestateid = useRef()
  const toast = useToast()
  const [image_url, setImageUrl] = useState('')

  const headers= {
    Authorization: 'Bearer ' + String(access_token) //the token is a variable which holds the token
  }
  
  
  
  
  const inputField = {
    name : "",
    photo : "",
    country : "",
    city : "",
    type_id : "",
    property_age_years : "",
    property_age_months : "",
    rented : "",
    owner : "",
    purchasing_cost : "",
    cost_currency : "",
    cost_date : "",
    purpose : 'commercial',
    number_of_floors : "",
    invoice_file : "",
    user_id:""
  }

  const {values,errors, handleBlur, handleChange, setValues, handleSubmit, handleReset, touched, setFieldValue} = useFormik({
    initialValues: inputField,
    validationSchema: propertyEditSchima,
    onSubmit: values =>{
      const {value:id} = realestateid.current
      if(!values.invoice_file){
        console.log("delete invoice field")
        delete values.invoice_file
      }
      if(values.rented === 'rented'){
        values.rented = true;
      }
      else{
        values.rented = false;
      }
      if(values.owner === 'owner'){
        values.owner = true;
      }
      else{
        values.owner = false;
      }
      
      if(!access_token){
        setErrors({"message":"You are not Login. First Login Then Create"})
        window.scrollTo(0,0)
        return;
      }
      
      axios
        .patch(baseURL+`/realestate/edit/${id}/`, values,{
          headers:{
            "Content-Type": "multipart/form-data",
            "Authorization":"Bearer "+ String(access_token)
          }
        })
        .then((res) => {
          console.log(res);
          toast({
                title: 'Update Successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
          router(`/property-list/${userType}`);
        })
        .catch((error) => {
          console.log(error.response)
          setErrors(error.response.data);
          
          if(error.response.status==401){
            setErrors({"message":error.response.data.messages[0].message})
          }
          window.scrollTo(0,0)

          

        });
    },
  })

 
  
  
  useEffect(()=>{



    getObjects("/country/", headers, setCountry)
    getObjects("/city/", headers, setCity);
    const cur = [...currency]
    const cr = Object.keys(CurrencyList.getAll().af)
    cr.map((item)=>cur.push({ key: item, value: item }))
    setCurrency(cur)
    




    const fatchdata = ()=>{
        const {userType:id} = router.query
        fetch(baseURL+'/real-estate-type/')
    .then(res=>res.json())
    .then(data=>{
      let type = [{ key: "Please select", value: "" }]
      data.map((item)=>type.push({ key: item.name, value: item.id.toString() }))
      setType(type)
    })

    if(userType==='Admin'){

      fetch(baseURL+'/all-user/')
      .then(res=>res.json())
      .then(data=>{
        let u = [{ key: "Please select", value: "" }]
        data.map((item)=>u.push({ key: item.username, value: item.id.toString() }))
        setUser(u)
        console.log(u)
      })
    }
        axios
        .get(
          baseURL + `/realestate/edit/${id}/`,{},{headers:headers}
          )
          .then((res) => {
            console.log(res.data);
            const {data} = res
            
              
            const state = country_state.find((val)=>val.country_name==data?.country).states
            let st = [...city]
            state.map(item=>st.push({key:item.state_name,value:item.state_name}))
            setCity(st)
            setImageUrl(data?.photo)

            
          
            setValues({
                name : data?.name,
                country :data?.country,
                city : data?.city,
                type_id :data?.type.id,
                property_age_years : data?.property_age_years,
                property_age_months : data?.property_age_months,
                rented : data?.rented,
                owner : data?.owner,
                purchasing_cost :data?.purchasing_cost,
                cost_currency : data?.cost_currency,
                cost_date : data?.cost_date,
                purpose : data?.purpose,
                number_of_floors : data?.number_of_floors,
                invoice_file : data.invoice_file?data?.invoice_file:"",
                user_id:data?.user.id
            })
            blobUrlToFile(data?.photo).then(res=>{
              setFieldValue('photo',res)
            })
          })
          .catch((error) => {
            console.log(error);
            if(error.response.status==404){
              toast({
                title: 'This Property Not Available',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
              router.push(`/property-list/${userType}`)
            }
    
            if(error.response.status==401){
    
              toast({
                title: 'you are Not Login Please login',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
              router.push('/account/login')
            }
          });
          
      };
      fatchdata()
  },[])

  const handleCountry = (e,setValue)=>{
    const {value} = e.target
    setValue('country',value)
    const state = country_state.find((val)=>val.country_name==value).states
    let st = [...city]
    state.map(item=>st.push({key:item.state_name,value:item.state_name}))
    setCity(st)

}


  const months = ()=>{
    let option = [{ key: "Please select", value: "" }];
    for(let i=0;i<=12;i++){
      option.push({ key: i.toString(), value: i.toString() })
    }
    return option
  }
  

  


  const style = {
    border: "1px solid silver",
    padding: "5px",
    borderRadius: "5px",
    width: "100%",
  };
  

  const [error, setErrors] = useState([]);

  
  const handleDelete = ()=>{
    const {value} = realestateid.current
    
        axios
          .delete(
            baseURL + `/realestate/delete/${value}/`,{headers:headers}
          )
          .then((res) => {
            console.log(res)
            
            toast({
              title: 'Delete Successfully',
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
            router.push(`/property-list/${userType}`)
            
          
          })
          .catch((error) => {
            // setcustomerror(error.response.data);
            console.log(error);
            if(error.response.status==401){

              toast({
                title: 'you are Not Login Please login',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
              router.push('/account/login')
            }
          });
          // window.location.reload()
  }



  return (
    <>
    <div className="py-2 px-4 flex justify-center">
      <div className="add-state-body w-3/4 mt-2 px-4 pb-3">
        <h2 className="text-center font-bold text-2xl text-gray-500 mt-2">Update Real Estate </h2>
        <Box display='flex' justifyContent='flex-end'>
          <Button type='button' colorScheme='red' onClick={handleDelete} p={2}>Delete</Button>

        </Box>
        <div className="p-4 shadow-md rounded-md">
        {error.message ? (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{error.message}.</AlertDescription>
            </Alert>
          ) : null}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <InputField
              title="Real Estate Name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              style={style}
              error={errors.name && touched.name?errors.name:null}
              
            />
            <div className="md:flex justify-between">
              <div className=" md:w-1/2">
                <CommonSelect
                  title="Real State Type"
                  name="type_id"
                  options={type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type_id}
                  error={errors.type_id && touched.type_id?errors.type_id:null}
                  
                />
              </div>
              <div className="md:ml-2 md:w-1/2 flex">
              <div className="md:ml-2">
                <img src={image_url} width={100} height={100} alt="property image" />
              </div>
              <div className="md:ml-2">
              <InputField 
                title="Image" 
                name="photo" 
                onChange={(e) =>{setFieldValue("photo", e.target.files[0]);}} 
                error={errors.photo && touched.photo?errors.photo:null} type="file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                // src = {values.photo}
              />
              </div>
              </div>
            </div>
            
            <div className="md:flex justify-between">
              <div className=" md:w-1/2">
                <CommonSelect
                  title="Select Country Name"
                  name="country"
                  options={country}
                  onChange={(e)=>handleCountry(e,setFieldValue)}
                  onBlur={handleBlur}
                  value={values.country}
                  error={errors.country && touched.country?errors.country:null}
                  
                />
              </div>

              <div className="md:ml-2 md:w-1/2">
                <CommonSelect
                  title="City Name"
                  name="city"
                  options={city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  error={errors.city && touched.city?errors.city:null}
                  
                />
              </div>
            </div>
           
            
            <div className="md:flex justify-between">
              <div className="md:w-1/2 flex">
                <div className="md:w-1/2 md:ml-2">
                  <InputField
                    title="Age of the Property (Years) "
                    type="Number"
                    name="property_age_years"
                    value={values.property_age_years}
                    style={style}
                    onChange={handleChange}
                    error={errors.property_age_years && touched.property_age_years?errors.property_age_years:null}
                    
                  />
                </div>
                <div className="md:w-1/2 md:ml-2">
                  <CommonSelect
                    title="Age of the Property (Months)"
                    name="property_age_months"
                    options={months()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.property_age_months}
                    
                    error={errors.property_age_months && touched.property_age_months?errors.property_age_months:null}
                  />
                </div>


                
              </div>
              {userType==='Admin' && <div className="md:w-1/2 md:ml-2">
                <CommonSelect
                  title="Select User"
                  name="user_id"
                  options={user}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.user_id}
                  
                  error={errors.user_id && touched.user_id?errors.user_id:null}
                />
              </div>}
            </div>
            <div className="md:flex justify-between">
              <div className="md:w-1/2">
                <InputFormRadio
                  name="rented"
                  sideText="Rented"
                  onclick={handleChange}
                  checked = {values.rented}
                  value='rented'
                  error={errors.rented && touched.rented?errors.rented:null}
                />
              </div>
              <div className="md:w-1/2 md:ml-2">
                <InputFormRadio
                  name="owner"
                  onclick={handleChange}
                  sideText="Are You the Owner"
                  value='owner'
                  checked = {values.owner}
                  error={errors.owner && touched.owner?errors.owner:null}
                />
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="md:w-1/2">
                <InputField
                  title="Purchasing / Rent Price or Cost"
                  type="Number"
                  name="purchasing_cost"
                  onChange={handleChange}
                  value={values.purchasing_cost}
                  
                  style={style}
                  error={errors.purchasing_cost && touched.purchasing_cost?errors.purchasing_cost:null}
                />
              </div>
              <div className="md:w-1/2 md:ml-2">
                <CommonSelect
                  title="Purchasing / Rent Price or CostCurrency"
                  name="cost_currency"
                  options={currency}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cost_currency}
                  
                  error={errors.cost_currency && touched.cost_currency?errors.cost_currency:null}
                />
              </div>
            </div>
            <div className="md:flex justify-between ">
              <div className="md:w-1/2">
                <InputField
                  title="Purchasing / Rent Price or CostDate"
                  type="date"
                  name="cost_date"
                  onChange={handleChange}
                  value={values.cost_date}
                  min={new Date().toISOString().slice(0,10)}
                  
                  style={style}
                  error={errors.cost_date && touched.cost_date?errors.cost_date:null}
                />
              </div>
              <div className="md:w-1/2 md:ml-2 mt-4">
                <InputFormRadio
                  sideText="This is Commercial Property"
                  name="purpose"
                  onclick={handleChange}
                  className=""
                  value={values.purpose}
                  error={errors.purpose && touched.purpose?errors.purpose:null}
                  checked={values.purpose}
                />
              </div>
            </div>
            <div className="md:flex justify-between">
              <div className="md:w-1/2">
                <InputField
                  title="Number of Floors "
                  type="text"
                  name="number_of_floors"
                  value={values.number_of_floors}
                  onChange={handleChange}
                  
                  error={errors.number_of_floors && touched.number_of_floors?errors.number_of_floors:null}
                  style={style}
                />
              </div>
              <div className="md:w-1/2 ml-2">
                <InputField
                  title="Upload Related Invoice"
                  type="file"
                  name="invoice_file"
                  onChange={(event) => {setFieldValue("invoice_file", event.target.files[0]);}}
                  
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  error={errors.invoice_file?errors.invoice_file:null}
                />
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button type="submit" value={router.query.id} ref={realestateid} className="text-white w-1/2 bg-[rgb(34,220,118)] hover:bg-[rgb(34,220,118)]  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[rgb(34,220,118)] dark:hover:bg-[rgb(34,220,118)]">Save</button>
              
              <button className="text-white w-1/2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={handleReset}>Cancel</button>
              
            </div>
          </form>
          
          
        </div>
      </div>
    </div>
    </>
  );
};



export default RequireAuth(EditState)