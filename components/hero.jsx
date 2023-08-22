import {
    Flex,
    Text,
  } from "@chakra-ui/react";
  import bg from '/about.webp'

function Hero({text, image}) {
  return (
    <Flex
          position={"relative"}
          w={"full"}
          h={"80vh"}
          backgroundImage={
            `url(${image?image:bg})`
          }
          backgroundSize={"cover"}
          backgroundPosition={"center center"}
          align={'center'}
          justifyContent={'center'}
        >
          
            <Text
            mt={'15%'}
              textTransform={'uppercase'}
              color={'rgb(38 220 118)'}
              fontWeight={600}
              fontSize={'5xl'}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}>
              {text}
            </Text>
        </Flex>
  )
}

export default Hero