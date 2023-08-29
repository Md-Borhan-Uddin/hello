import { Flex, Box } from "@chakra-ui/react";
import React from "react";

import Hero from "../../components/hero";
import Mission from "../../components/mission";
import TopSection from "../../components/topSection";

function MishonAndVishon() {
  const missionTextE = `Enabling real estate owners to preserve and increase the value of their assets.  (through automating the ownership experience)`;
  const missionTextA =
    "تمكين ملاك العقارات السكنية و التجارية من الحفاظ على، و زيادة قيمة ممتلكاتهم. (عن طريق توفير أدوات تقنية لتطوير تجربة الملكية)";
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
          <Mission
            Etext={missionTextE}
            Atext={missionTextA}
            Atitle={"الرسالة:"}
            Etitle={"Our Mission"}
          />
        </Box>

        <Box width={"full"}>
          <Mission
            reverse
            Etext={
              "Becoming the second step a real estate takes after acquiring an asset."
            }
            Etitle={"Our Vision"}
            Atext={"أن نكون الخطوة الثانية التي يتخذها مالك العقار بعد شراءه.."}
            Atitle={"رؤيتنا:"}
          />
        </Box>
      </Box>
    </Flex>
  );
}

export default MishonAndVishon;
