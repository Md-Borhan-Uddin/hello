import PropertyItem from '../../../../components/PropertyItem'
import SearchForm from '../../../../components/search/SearchForm'
import { Box, Container, Flex, Text } from '@chakra-ui/react'
import axios from "axios";
import { baseUrl } from "../../../../utility/baseURL";

import React, { useEffect, useState } from 'react'
import { getUser, token } from '../../../../utility/authentication';


export default function PropertyList() {
  
  const [data, setData] = useState([])
  const {userType,access_token} = getUser()
  const  headers = {
      
      'Authorization': 'Bearer '+String(access_token)
    }
  useEffect(()=>{
    axios.get(baseUrl.defaults.baseURL+`/realestate/${userType}/`,{headers:headers})
    .then(res=>{setData(res.data.results);})
    .catch(error=>console.log(error))
  },[])
  return (
    <>
    <Box>
      <Container maxW={'6xl'}  py={6}>
      <Box>
        <SearchForm />
      </Box>
    
      <Box>
        
          <Flex gap={5}>
            <Box maxW={'4xl'}>
              {data.map((item,i)=>
              <PropertyItem data = {item} key={i}/>
              )}
              </Box>
            
          </Flex>
        
      </Box>
      </Container>
    </Box>
    </>
  )
}




