import React, { useEffect, useState } from "react";
import DeleteButton from "../../../components/deleteButton";
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
  Text,
} from "@chakra-ui/react";

import axios from "axios";
import { baseUrl } from "../../../utility/baseURL";
import { getUser } from "../../../utility/authentication";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import Paginator from "../../../components/Paginator";
import { CustomModal } from "../../../components/modal";
import ScheduleForm from "../../../components/form/scheduleForm";

function ScheduleMaintain() {
  const [isEdit, setIsEdit] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [id, setId] = useState();
  const router = useNavigate();
  const toast = useToast();
  const [editItem, setEditItem] = useState({});
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { access_token } = getUser();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  const getObject = async (url, id = null) => {
    let endpoint = baseUrl.defaults.baseURL + `/${url}/`;
    if (id) {
      endpoint = baseUrl.defaults.baseURL + `/${url}/${id}/`;
    }
    const res = axios.get(endpoint, { headers: headers });
    return res;
  };
  const handlePageChange = (url, action) => {
    console.log("change");
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (action === "next") {
          setCurrentPage(currentPage + 1);
        }
        if (action === "previous") {
          setCurrentPage(currentPage - 1);
        }
        setSchedules(res.data.results);
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setTotalItems(res.data.count);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getObject("schedule-maintain")
      .then((res) => {
        setSchedules(res.data.results);
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setTotalItems(res.data.count);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEdit = (e) => {
    setIsEdit(true);
    const { value } = e.target;
    setId(value);
    const data = schedules.filter((item) => item.id === parseInt(value));
    setEditItem(data[0]);
    onOpen();
  };

  const handleDelete = (id) => {
    axios
      .delete(baseUrl.defaults.baseURL + `/schedule-maintain/${id}/`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        getObject("schedule-maintain").then((res) => setSchedules(res.data));
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
    <>
      <Box py={12} px={4}>
        <HStack spacing={2} textAlign="center" mb="1rem">
          <Heading as="h1" fontSize="4xl">
            Schedule List
          </Heading>
          <Spacer />
          <Button colorScheme="primary" onClick={onOpen}>
            Add Schedule
          </Button>
        </HStack>
        <Box>
          {schedules.length > 0 ? (
            <Box>
              <TableContainer>
                <Table variant="simple" textAlign={"center"}>
                  <Thead bg={"gray.200"}>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Maintain Date</Th>
                      <Th>Status</Th>
                      <Th>Real Estate</Th>
                      <Th>Asset</Th>
                      <Th textAlign={"center"}>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {schedules.map((item) => {
                      return (
                        <Tr key={item.id}>
                          <Td>{item.name}</Td>
                          <Td>{item.maintain_date}</Td>
                          <Td>{item.status}</Td>
                          <Td>{item.real_estate.name}</Td>
                          <Td>{item.asset.name}</Td>
                          <Td>
                            <HStack
                              alignItems={"center"}
                              justifyContent={"center"}
                            >
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
              <Box>
                <Paginator
                  handleNextPage={() => handlePageChange(nextUrl, "next")}
                  handlePreviousPage={() =>
                    handlePageChange(previousUrl, "previous")
                  }
                  isNext={nextUrl}
                  isPrevious={previousUrl}
                  totalItem={totalItems}
                  page={currentPage}
                />
              </Box>
            </Box>
          ) : (
            <Text fontSize={"2xl"} textAlign={"center"} mt={"2rem"}>
              You haven't Schedule
            </Text>
          )}
        </Box>
      </Box>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Add Schedule"}
        maxW={"50%"}
      >
        <ScheduleForm
          onClose={onClose}
          isEdit={isEdit}
          id={id}
          editItem={editItem}
        />
      </CustomModal>
    </>
  );
}

export default RequireAuth(ScheduleMaintain);
