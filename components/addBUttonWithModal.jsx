import { Button, useToast } from "@chakra-ui/react";
import { CustomModal } from "./modal";
import { baseURL } from "../utility/baseURL";
import axios from "axios";
import { getUser } from "../utility/authentication";
import React from "react";
import RealestateForm from "./form/realestateForm";

function AddBUttonWithModal({
  btnText,
  isEdit,
  editItem,
  onOpen,
  onClose,
  isOpen,
}) {
  const { access_token, userType } = getUser();
  const toast = useToast();

  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };

  const handleOpen = () => {
    axios
      .get(baseURL + "/active-membership/", { headers: headers })
      .then((res) => {
        if (userType === "Admin") {
          onOpen();
        } else if (
          userType === "RealTor" &&
          res.data.id &&
          new Date(res.data.expire_date) > new Date()
        ) {
          onOpen();
        } else {
          toast({
            title: "you don't have active membership",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button colorScheme="primary" onClick={handleOpen}>
        {btnText}
      </Button>
      <CustomModal
        maxW="70%"
        onClose={onClose}
        isOpen={isOpen}
        title="Add Real Estate"
      >
        <RealestateForm
          isEdit={isEdit}
          data={isEdit ? editItem : null}
          onClose={onClose}
        />
      </CustomModal>
    </>
  );
}

export default AddBUttonWithModal;
