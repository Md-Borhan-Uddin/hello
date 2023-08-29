import { baseURL } from "../../../utility/baseURL";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HStack,
  Heading,
  Spacer,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { getUser } from "../../../utility/authentication";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import RealestateList from "./realestateList";
import AddButtonWithModal from "../../../components/addButtonWithModal";
const RealestateForm = React.lazy(() =>
  import("../../../components/form/realestateForm")
);

const AddState = () => {
  const { access_token, userType } = getUser();
  const [realestate, setRealestate] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const router = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/realestate/${userType}/`, { headers: headers })
      .then((res) => {
        console.log(res);
        setRealestate(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (id) => {
    setIsEdit(true);
    const data = realestate.filter((item) => item.id == id);
    setEditItem(data);
    onOpen();
  };


  return (
    <>
      <Box py={12} px={4}>
        <HStack spacing={2} textAlign="center" mb="1rem">
          <Heading as="h1" fontSize="4xl">
            All Real Estate
          </Heading>
          <Spacer />
          <AddButtonWithModal
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
            btnText={"Add Real Estate"}
          >
            <RealestateForm
          isEdit={isEdit}
          data={isEdit ? editItem : null}
          onClose={onClose}
          setRealestate={setRealestate}
          realestates={realestate}
        />

            </AddButtonWithModal>
        </HStack>
        <RealestateList setRealestate={setRealestate} realestate={realestate} handleEdit={handleEdit} />
      </Box>
    </>
  );
};

export default RequireAuth(AddState);
