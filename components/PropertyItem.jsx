import {
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";

export default function PropertyItem({ data }) {
  return (
    <LinkBox>
      <Center mt={5}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "50rem" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1.5}>
            <img width={450} height={285} alt="image" src={data.photo} />
          </Flex>

          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              <LinkOverlay href={`/property/${data.id}/${data.name}`}>
            <NavLink to={`/property/${data.id}/${data.name}`}>
                

                {data.name}
                </NavLink>
              </LinkOverlay>
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              ADID:{data.realestate_id}
            </Text>
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              Actress, musician, songwriter and artist. PM for work inquires or
              <Link href={"#"} color={"blue.400"}>
                #tag
              </Link>
              me in your posts
            </Text>
            <SimpleGrid columns={3} spacingX={3}>
              <Flex gap={3} align={"center"}>
                <Icon as={FaBed} boxSize={7} />
                <Text fontSize={20} fontWeight={500}>
                  23
                </Text>
              </Flex>

              <Flex gap={3} align={"center"}>
                <Icon as={FaBath} boxSize={7} />
                <Text fontSize={20} fontWeight={500}>
                  4
                </Text>
              </Flex>

              <Flex gap={3} align={"center"}>
                <Icon as={CgMenuGridR} boxSize={7} />
                <Text fontSize={20} fontWeight={500}>
                  2700
                </Text>
              </Flex>
            </SimpleGrid>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Link to={"#"}>
                <Button
                  as={"a"}
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  color={"white"}
                  bg={"rgb(1, 22, 39)"}
                  _hover={{
                    bg: "rgb(1, 22, 39)",
                  }}
                  _focus={{
                    bg: "rgb(1, 22, 39)",
                  }}
                >
                  Message
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  as={"a"}
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"rgb(38,220,118)"}
                  color={"white"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "rgb(38,220,118)",
                  }}
                  _focus={{
                    bg: "rgb(38,220,118)",
                  }}
                >
                  Call
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </LinkBox>
  );
}
