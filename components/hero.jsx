import {
    Flex,
    Text,
  } from "@chakra-ui/react";

function Hero({text, image}) {
  return (
    <Flex
          position={"relative"}
          w={"full"}
          h={"80vh"}
          backgroundImage={
            `url(${image?image:'https://images.unsplash.com/photo-1616587896595-51352538155b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'})`
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