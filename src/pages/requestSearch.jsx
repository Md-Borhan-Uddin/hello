import React, { useEffect, useState } from 'react'
import RequireAuth from '../../components/auth/TokenExpaireCheck'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../utility/baseURL'
import DeleteButton from '../../components/deleteButton'
import {
  Box,
  Button,
  Flex,
  HStack,
  Switch,
  Text,
} from "@chakra-ui/react";
import {BiEdit} from 'react-icons/bi'

function RequestSearch() {
    const location = useLocation()
    const router = useNavigate()
    console.log(location)
    
    const [items, setItems] = useState([])
    console.log('items',items)
    useEffect(()=>{
      if(!items){
        router('/dashboard')
      }
      let URL;
      if(location.state.type==='request'){
        URL = `${baseURL}/request-search/`
      }
      else{
        URL = `${baseURL}/search-realestate/`
      }
        axios.get(URL,{params:location.state.data})
        .then(res=>setItems(res.data))
        .catch(err=>console.log(err))
    },[location])
    const handleDelete = ()=>{}
  return (
    <>
      <Box>
        <div className="relative overflow-x-auto mt-3 pr-3">
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0.5rem"}
          >
            <Text as={"h2"} fontSize={"1.3rem"} textAlign={"center"}>
              Request List
            </Text>
            
          </Flex>
          {location.state.type==='request'&& <RequestItem items={items} handleDelete={handleDelete}/>}
          {location.state.type==='real-estate'&& <RealestateItem items={items} handleDelete={handleDelete}/>}
        </div>
      </Box>

    </>
  )
}

export default RequireAuth(RequestSearch)



const RequestItem = ({items, handleDelete})=>{
  return(
    <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Request Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Submit Date
                </th>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
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
              {items.map((item, i) => {
                  return (
                    <tr
                    className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={i}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.id}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {location.state.type}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(item.create).toISOString().slice(0, 10)}
                      {/* {item.create.toISOString().slice(0, 10)} */}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.first_name}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.last_name}
                    </td>
                    
                    <td className="px-6 py-4">
                    <Switch
                          value={item.id}
                          isChecked={item.is_active}
                        />
                        
                    </td>
                    <td className="px-6 py-4">
                      <HStack alignItems={"center"} justifyContent={"center"}>
                        <Button
                          aria-label="editbtn"
                          // onClick={handleEdit}
                          value={item.id}
                          colorScheme="teal"
                          icon={<BiEdit />}
                        >
                          Edit
                        </Button>

                        <DeleteButton handleDelete={handleDelete} id={item.id}/>
                      </HStack>
                    </td>
                  </tr>
                  )
                
                
              })}
            </tbody>
          </table>
  )
}


const RealestateItem = ({items, handleDelete})=>{
  return(
    <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>

                <th scope="col" className="px-6 py-3">
                  Real Estate Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Creation Profile Date
                </th>

                <th scope="col" className="px-6 py-3">
                  Country
                </th>

                <th scope="col" className="px-6 py-3">
                  city
                </th>

                <th scope="col" className="px-6 py-3">
                  Real Estate Type
                </th>

                <th scope="col" className="px-6 py-3">
                  Number of floor
                </th>

                <th scope="col" className="px-6 py-3">
                  Owiner's First Name
                </th>

                <th scope="col" className="px-6 py-3">
                Owiner's Last Name
                </th>

                <th scope="col" className="px-6 py-3">
                Owiner's Username
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
              {items.map((item, i) => {
                  return (
                    <tr
                    className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={i}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.id}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(item.user.date_joined).toISOString().slice(0, 10)}
                      {/* {item.create.toISOString().slice(0, 10)} */}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {/* {item.countrydata.name} */}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {/* {item.citydata.name} */}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.type.name}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.number_of_floor}
                    </td>

                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.user.first_name}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.user.last_name}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.user.username}
                    </td>
                    
                    <td className="px-6 py-4">
                    <Switch
                          value={item.id}
                          isChecked={item.is_active}
                        />
                        
                    </td>
                    <td className="px-6 py-4">
                      <HStack alignItems={"center"} justifyContent={"center"}>
                        <Button
                          aria-label="editbtn"
                          // onClick={handleEdit}
                          value={item.id}
                          colorScheme="teal"
                          icon={<BiEdit />}
                        >
                          Edit
                        </Button>

                        <DeleteButton handleDelete={handleDelete} id={item.id}/>
                      </HStack>
                    </td>
                  </tr>
                  )
                
                
              })}
            </tbody>
          </table>
  )
}