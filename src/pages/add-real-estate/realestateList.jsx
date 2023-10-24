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
import { baseURL } from "../../../utility/baseURL";
import axios from "axios";
import DeleteButton from "../../../components/deleteButton";
import { getUser } from "../../../utility/authentication";

function RealestateList({ realestate,handleEdit,setRealestate }) {

  const { access_token } = getUser()
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  const toast = useToast()
  console.log(realestate)

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



  return (
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
                  <Td>{item.cost_currency}</Td>
                  <Td>{item.purchasing_cost}</Td>
                  <Td>{item.type.name}</Td>
                  <Td>
                    <HStack alignItems={"center"} justifyContent={"center"}>
                      <Button
                        aria-label="editbtn"
                        onClick={(e)=>handleEdit(e.target.value)}
                        value={item.id}
                        colorScheme="teal"
                      >
                        Edit
                      </Button>
                      <DeleteButton
                        handleDelete={() => handleDelete(item.id)}
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
  );
}

export default RealestateList;
