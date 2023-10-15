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
  useToast,
  Divider,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FcOk, FcDisapprove } from "react-icons/fc";
import axios from "axios";
import { baseURL, baseUrl } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
const DeleteButton = React.lazy(() =>
  import("../../../components/deleteButton")
);
// const CurrencyList = React.lazy(()=>import("currency-list"));

import AddButtonWithModal from "../../../components/addButtonWithModal";
import AssetForm from "./assetForm";
import baseAxios from "../../../utility/axiosConfig";

function Assets() {
  const [isEdit, setIsEdit] = useState(false);
  const [assets, setAssets] = useState([]);
  const router = useNavigate();
  const toast = useToast();
  const [editItem, setEditItem] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { access_token } = getUser();

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  const getAssets = async (id = null) => {
    let url = baseUrl.defaults.baseURL + "/assets/";
    if (id) {
      url = baseUrl.defaults.baseURL + `/assets/${id}/`;
    }
    const res = await fetch(url, { headers: headers })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });

    return res;
  };

  useEffect(() => {
    
    baseAxios
      .get(baseURL + "/assets/", { headers: headers })
      .then((res) => {
        setAssets(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const handleEdit = (e) => {
    
    setIsEdit(true);
    const { value } = e.target;
    const data = assets.filter(item=>item.id==value)
    setEditItem(data[0])
    onOpen()
    
  };

  

  const handleDelete = (id) => {
    baseAxios
      .delete(baseUrl.defaults.baseURL + `/assets/${id}/`, {
        headers: headers,
      })
      .then((res) => {
        getAssets().then((res) => setAssets(res));
        toast({
          title: "Delete Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
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
  const updateAssert = (updateItem)=>{
    const newasset = assets.filter(item=>item.id != updateItem.id)
    setAssets([...newasset,updateItem])
  }
  return (
    <>
      <Box py={12} px={4}>
        <HStack spacing={2} textAlign="center" mb="1rem">
          <Heading as="h1" fontSize="4xl">
            All Assets
          </Heading>
          <Spacer />
          <AddButtonWithModal
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
            btnText={"Add Asset"}
          >
            <AssetForm
              isEdit={isEdit}
              data={isEdit ? editItem : null}
              onClose={onClose}
              update={updateAssert}
            />
          </AddButtonWithModal>
          
        </HStack>
        <Box>
          <TableContainer>
            <Table variant="simple" textAlign={"center"}>
              <Thead bg={"gray.200"}>
                <Tr>
                  <Th>Name</Th>
                  <Th>Purchesing Date</Th>
                  <Th>Free/Active</Th>
                  <Th>Price</Th>
                  <Th textAlign={"center"}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assets.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td>
                        {item.purchasing_date}
                      </Td>
                      <Td>
                        <Flex>
                          {item.is_free ? (
                            <Icon as={FcOk} />
                          ) : (
                            <Icon as={FcDisapprove} />
                          )}
                          <Divider
                            borderColor="gray.600"
                            orientation="vartical"
                            width="2px"
                            margin="2px"
                            borderTopWidth="20px"
                            size="3px"
                          />
                          {item.is_active ? (
                            <Icon as={FcOk} />
                          ) : (
                            <Icon as={FcDisapprove} />
                          )}
                        </Flex>
                      </Td>
                      <Td>{item.purchasing_price}</Td>
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
                          <DeleteButton
                            handleDelete={handleDelete}
                            id={item.id}
                          />
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
    </>
  );
}

export default RequireAuth(Assets);
