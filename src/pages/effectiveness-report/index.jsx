import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import { CustomModal } from "../../../components/modal";
const EffectiveReportForm = React.lazy(()=>import("../../../components/form/effectiveReportForm"));
const GeneratePDF = React.lazy(()=>import("../../../components/GeneratePDF"));




function EffectReport() {
  const [realestate, setRealesate] = useState([]);
  const  [isEdit, setIsEdit] = useState(false)
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { access_token, userType } = getUser();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  // const getPackage = async (id=null)=>{
    
  //   let url = baseURL+'/package/'
  //   if(id){
  //     url = baseURL+`/package/${id}/`
  //   }
  //   const res = await fetch(url,{headers:headers})
  //   .then(res=> res.json())
  //   .then(data=>{return data})
  //   .catch(error=>{console.log(error)})
    
  //   return res
  // }

  useEffect(()=>{
    axios.get(baseURL+`/realestate/${userType}`,{headers:headers})
    .then(res=>{setRealesate(res.data.results)})
    .catch(error=>{console.log(error)})

    // getPackage().then(res=>console.log("data",res))
    
  },[])

  



 
 
  

  return (
    <>
      <Box py={12} px={4}>
        <HStack spacing={2} textAlign="center" mb='1rem'>
          <Heading as="h1" fontSize="4xl">
            All Real Estate
          </Heading>
          <Spacer />
          <Button colorScheme="primary" onClick={()=>{setIsEdit(false); onOpen()}}>
            Add Report
          </Button>
        </HStack>
        <Box>
          <TableContainer>
            <Table variant="simple" textAlign={"center"}>
              <Thead bg={"gray.200"}>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Photo</Th>
                  <Th>Location</Th>
                  <Th>Number of Foors</Th>
                  <Th textAlign={"center"}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {realestate.map((item) => {
                  return (
                    <Tr key={item.id}>
                        <Td>{item.realestate_id}</Td>
                      <Td>{item.name}</Td>
                      <Td>
                        <img src={item.photo} width={80} height={80} alt="image" />
                      </Td>
                      <Td>
                        {/* <Text>{item.location}</Text> */}
                        
                      </Td>
                      <Td>{item.number_of_floors}</Td>
                      <Td>
                        <HStack alignItems={"center"} justifyContent={"center"}>
                          <GeneratePDF realestate={item} />
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        
     
      </Box>

   

      <CustomModal isOpen={isOpen} onClose={onClose} title={'Add Report'} maxW={'50%'}>
        <EffectiveReportForm onClose={onClose}/>
      </CustomModal>
    </>
  );
}





export default RequireAuth(EffectReport)