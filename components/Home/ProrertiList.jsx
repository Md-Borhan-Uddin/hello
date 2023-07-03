import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function PropatyList() {
  const router = useNavigate()
    const searchClick = ()=>{
        router.push('/property-list/12')
    }
  return (
    <Box p={4} py={20} bgColor={'rgb(1, 22, 39)'}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"} color={'white'}>
          Explore Our House
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          <Card maxW="sm" borderTopRadius={5} _hover={{transform:'scale(1.1)',transition:'ease-in 0.5s'}} transition={'ease-in 0.5s'} >
            <CardBody p={0}>
              <img
                src="https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="Green double couch with wooden legs"
                width={400}
                height={400}
                className="rounded-t-md"
              />
              <Stack spacing="3" p={5} textAlign={'center'}>
                <Heading as={'h4'} fontSize={'xl'} fontWeight={500} color={'rgb(1,30,44)'}>The Apartments at Lincoln Common</Heading>
                <Text fontWeight={500}>2345 N Lincoln Ave,<br />Chicago, IL 60614
                </Text>
                <Text fontWeight={500}>Studio - 3 Beds | $2,395 - $7,802</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter justifyContent={'end'}>
                <Button rightIcon={<ArrowForwardIcon />} onClick={searchClick} colorScheme='rgb(38,220,118)' variant='outline'>
                    See Detail
                </Button>
            </CardFooter>
            
            
          </Card>
          <Card maxW="sm" borderTopRadius={5} _hover={{transform:'scale(1.1)',transition:'ease-in 0.5s'}} transition={'ease-in 0.5s'} >
            <CardBody p={0}>
              <img
                src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                alt="Green double couch with wooden legs"
                width={400}
                height={400}
                className="rounded-t-md"
              />
              <Stack spacing="3" p={5} textAlign={'center'}>
                <Heading as={'h4'} fontSize={'xl'} fontWeight={500} color={'rgb(1,30,44)'}>The Apartments at Lincoln Common</Heading>
                <Text fontWeight={500}>2345 N Lincoln Ave,<br />Chicago, IL 60614
                </Text>
                <Text fontWeight={500}>Studio - 3 Beds | $2,395 - $7,802</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter justifyContent={'end'}>
                <Button rightIcon={<ArrowForwardIcon />} onClick={searchClick} colorScheme='rgb(38,220,118)' variant='outline'>
                    See Detail
                </Button>
            </CardFooter>
            
          </Card>
          <Card maxW="sm" borderTopRadius={5} _hover={{transform:'scale(1.1)',transition:'ease-in 0.5s'}} transition={'ease-in 0.5s'} >
            <CardBody p={0}>
              <img
                src='https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                alt="Green double couch with wooden legs"
                width={400}
                height={400}
                className="rounded-t-md"
              />
              <Stack spacing="3" p={5} textAlign={'center'}>
                <Heading as={'h4'} fontSize={'xl'} fontWeight={500} color={'rgb(1,30,44)'}>The Apartments at Lincoln Common</Heading>
                <Text fontWeight={500}>2345 N Lincoln Ave,<br />Chicago, IL 60614
                </Text>
                <Text fontWeight={500}>Studio - 3 Beds | $2,395 - $7,802</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter justifyContent={'end'}>
                <Button rightIcon={<ArrowForwardIcon />} onClick={searchClick} colorScheme='rgb(38,220,118)' variant='outline'>
                    See Detail
                </Button>
            </CardFooter>
            
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
