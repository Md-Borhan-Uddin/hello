import { useUserActivationMutation } from "../../../data/auth/service/authServices";


import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Text,
  Container,
  Flex,
  useToast,
  useDisclosure,
  Alert,
  AlertDescription,
  CloseButton,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { baseURL } from "../../../utility/baseURL";
import { butifyErrors } from "../../../utility/utlity";

export default function Activate() {
  const router = useNavigate();
  const urlData = useParams();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [resend, setResend] = useState(false);
  const toast = useToast();
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure();

  const [activate, { isLoading }] = useUserActivationMutation();
  

  useEffect(() => {
    const { uid, token } = urlData;
    console.log(uid, token);
    const data = { uid: uid, token: token };
    async function getActivate() {
      const res = await activate(data);
      if (res.data) {
        console.log(res.data);
        toast({
          description: "Account Activate",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router("/login");
      }
      if (res.error) {
        setErrors(butifyErrors(res.error.data));
        onOpen();
        console.log("error", res.error);
        toast({
          description: "Token is expair or Invalid",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      console.log(res);
    }
    getActivate();
  }, [urlData]);
  const handleReSendEmail = () => {
    axios
      .post(baseURL + "/resend-activation/", { email: email })
      .then((res) => {
        console.log(res);
        setResend(true);
        setEmail('')
        setErrors('')
        onClose()
        toast({
          description: "Activation link Send this email.Check Your Email",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        const { data } = err.response;
        setErrors(data.messages);
        setResend(false);
        console.log('error',err);
      });
  };
  

  const pageContent = isLoading ? (
    <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="secondary.200"
        color="primary.500"
        size="xl"
      />
    </Flex>
  ) : (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      flexDirection={"column"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Container maxW={"lg"} mb={"1rem"}>
        {isVisible && errors && (
          <Alert status="error" justifyContent={"space-between"}>
            <AlertDescription>{errors}</AlertDescription>

            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </Alert>
        )}
      </Container>
      <Container
        maxW={"lg"}
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
        direction={"column"}
      >
        {errors ? (
          <Stack direction={"column"} as={"form"} spacing={"12px"}>
            <Text mt={2} textAlign={"center"} color="gray.500">
              Resend Activation Link Give Your Register Email
            </Text>
            <Flex gap={"0.5rem"}>
              <FormControl>
                <Input
                  variant={"solid"}
                  borderWidth={1}
                  color={"gray.800"}
                  _placeholder={{
                    color: "gray.400",
                  }}
                  borderColor={useColorModeValue("gray.300", "gray.700")}
                  id={"email"}
                  type={"email"}
                  required
                  placeholder={"Your Email"}
                  aria-label={"Your Email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl w={{ base: "100%", md: "40%" }}>
                <Button
                  colorScheme="primary"
                  onClick={handleReSendEmail}
                  w="100%"
                >
                  Resend
                </Button>
              </FormControl>
            </Flex>
          </Stack>
        ) : resend ? (
          <Flex
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            mt={"0.5rem"}
          >
            <Text mt={2} textAlign={"center"} color="gray.500">
              Resend Activation Link On Email
            </Text>
          </Flex>
        ) : (
          <Flex
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            mt={"0.5rem"}
          >
            <Text mt={2} textAlign={"center"} color="gray.500">
              your account active now you go with us
            </Text>
            <Button
              backgroundColor={"rgb(38,220,118)"}
              color={"whiteAlpha.900"}
              _hover={{ backgroundColor: "rgb(78, 228, 143)" }}
            >
              <Link to="/login">Login</Link>
            </Button>
          </Flex>
        )}
      </Container>
    </Flex>
  );

  return pageContent;
}

// export default ;
