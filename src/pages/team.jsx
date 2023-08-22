import { Flex, Box, Center, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import Hero from "../../components/hero";
import TopSection from "../../components/topSection";
import TeamCard from "../../components/teanCard";

function Team() {
  const teamText = `Snippy is a rich coding snippets app that lets you create your own code
  snippets, categorize them, and even sync them in the cloud so you can use them
  anywhere. All that is free!`;
  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Hero text={"Meet Our Team"} />
      </Box>
      <Box>
        <TopSection title={"Our Team Member"} text={teamText} />
      </Box>
      <Center my={3}>
        <TeamCard name={"David"} position={"CEO"} email={'david@gmail.com'}/>
      </Center>
      <SimpleGrid columns={3} gap={3}>
        <TeamCard name={"David"} position={"CEO"} email={'david@gmail.com'} />
        <TeamCard name={"David"} position={"CEO"} email={'david@gmail.com'} />
        <TeamCard name={"David"} position={"CEO"} email={'david@gmail.com'} />
        <TeamCard name={"David"} position={"CEO"} email={'david@gmail.com'} />
      </SimpleGrid>
    </Flex>
  );
}

export default Team;
