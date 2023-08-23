
import { baseURL } from "../../../utility/baseURL";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HStack,
  Heading,
  Spacer,
  Button,
  TableContainer,
  Table,
  Th,
  Td,
  Tr,
  Thead,
  Tbody,
  Box,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getUser } from "../../../utility/authentication";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import DeleteButton from "../../../components/deleteButton";
import { CustomModal } from "../../../components/modal";
import RealestateForm from "../../../components/form/realestateForm";

const AddState = () => {
  const { access_token, userType } = getUser();
  const [realestate, setRealestate] = useState([]);
  const [editItem, setEditItem] = useState({})
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState();
  const router = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  const toast = useToast();

  

  useEffect(() => {
    
    axios
      .get(`${baseURL}/realestate/${userType}/`, { headers: headers })
      .then((res) => {
        console.log(res)
        setRealestate(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  

  const handleEdit = (e) => {
    setIsEdit(true);
    const { value } = e.target;
    setId(value);
    const data = realestate.filter(item=>item.id==value)
    setEditItem(data)
    onOpen();
  };


  const handleDelete = (id) => {

    axios
      .delete(baseURL + `/realestate/delete/${id}/`, {
        headers: headers,
      })
      .then((res) => {
        const obj = realestate.filter((item) => item.id != id);
        setRealestate(obj);
        toast({
          title: "Delete Successfully",
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
  };
  const handleOpen = ()=>{
    axios.get(baseURL+'/active-membership/',{headers:headers})
    .then(res=>{
      if(userType==='Admin'){
        setIsEdit(false);
        onOpen();
      }
      else if(userType==='RealTor' && res.data.id && new Date(res.data.expire_date)> new Date()){
        
        setIsEdit(false);
        onOpen();
      }
      else{
        toast(
          {
            title: "you don't have active membership",
            status: "error",
            duration: 2000,
            isClosable: true,
          }
        )
      }
    })
    .catch(err=>{
      console.log(err)
    })
    
  }

  

  return (
    <>
      <Box py={12} px={4}>
        <HStack spacing={2} textAlign="center" mb="1rem">
          <Heading as="h1" fontSize="4xl">
            All Real Estate
          </Heading>
          <Spacer />
          <Button
            colorScheme="primary"
            onClick={handleOpen}
          >
            Add Real Estate
          </Button>
        </HStack>
        <Box>
          <TableContainer>
            <Table variant="simple" textAlign={"center"}>
              <Thead bg={"gray.200"}>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Currency</Th>
                  <Th>Purchasing Cost</Th>
                  <Th>Type</Th>
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
                        {item.cost_currency}
                      </Td>
                      <Td>
                        {item.purchasing_cost}
                      </Td>
                      <Td>{item.type.name}</Td>
                      <Td>
                        <HStack alignItems={"center"} justifyContent={"center"}>
                          <Button
                            aria-label="editbtn"
                            onClick={handleEdit}
                            value={item.id}
                            colorScheme="teal"
                          >
                            Edit
                          </Button>
                          <DeleteButton handleDelete={handleDelete} id={item.id} />
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

      <CustomModal maxW="70%" onClose={onClose} isOpen={isOpen} title="Add Real Estate">
        <RealestateForm isEdit={isEdit} data={isEdit?editItem:null} onClose={onClose}/>
      </CustomModal>
    </>
  );
};

export default RequireAuth(AddState);
