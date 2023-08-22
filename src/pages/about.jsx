import {
  Flex,
  Box,
  Center,
} from "@chakra-ui/react";
import React from "react";
import Story from "../../components/Home/OurStory";

import Hero from "../../components/hero";

function About() {
  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Hero text={'Our Story'}/>
      </Box>
      <Center>
        <Story />
      </Center>
    </Flex>
  );
}

export default About;
