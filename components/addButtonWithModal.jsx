import { Button, useToast } from "@chakra-ui/react";
import { CustomModal } from "./modal";
import { getUser } from "../utility/authentication";
import React from "react";
import baseAxios  from "../utility/axiosConfig";

function AddButtonWithModal({ btnText, children, onOpen, onClose, isOpen }) {
  const { userType } = getUser();
  const toast = useToast();

  const getMember = () => {
    baseAxios
      .get("/active-membership/")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleOpen = () => {
    baseAxios
      .get("/active-membership/")
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
        {children}
      </CustomModal>
    </>
  );
}

export default AddButtonWithModal;
