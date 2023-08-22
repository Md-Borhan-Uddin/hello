import { Flex, Box } from "@chakra-ui/react";
import React from "react";

import Hero from "../../components/hero";
import Mission from "../../components/mission";
import TopSection from "../../components/topSection";

function MishonAndVishon() {
  const missionText = `Snippy is a rich coding snippets app that lets you create your own code
  snippets, categorize them, and even sync them in the cloud so you can use them
  anywhere. All that is free!`;
  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Hero text={"Our Mission and Vision"} />
      </Box>
      <Box>
        <TopSection
          title={"Our Mission And Vision"}
          text={"Mission and Vision"}
        />
      </Box>
      <Box>
        <Box width={"full"}>
          <Mission text={missionText} title={"Our Mission"} />
        </Box>

        <Box width={"full"}>
          <Mission reverse text={missionText} title={"Our Mission"} />
        </Box>
      </Box>
    </Flex>
  );
}

export default MishonAndVishon;
