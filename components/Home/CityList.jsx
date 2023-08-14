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
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Badge,
  Tag,
  TagLabel,
  HStack
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";


export default function CityList() {
  const router = useNavigate()
    const searchClick = ()=>{
        router.push('/property-list/12')
    }
  return (
    <Box py={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Something New Everyday
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          <LinkBox>
          <Card maxW="sm" borderTopRadius={5} shadow={'md'}>
            <CardBody p={0}>
              
              <Image
                src='https://images.unsplash.com/photo-1616285838730-276556249d0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                alt="Green double couch with wooden legs"
                width={320}
                height={200}
                className="rounded-t-md"
              />
              
              <Stack spacing="3" p={5} textAlign={'center'}>
              <HStack>
              <Tag 
                size={'md'}
                borderRadius='full'
                variant='solid'
                colorScheme='green'
                >
                <TagLabel>Jeddah</TagLabel>
              </Tag>
              </HStack>
              <LinkOverlay as={Link} href="/property-list/12">
                <Text fontWeight={500}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis</Text>
                </LinkOverlay>
              </Stack>
            </CardBody>
            
            
          </Card>
          
          </LinkBox>
          <LinkBox>
          <Card  borderTopRadius={5} shadow={'md'}>
            <CardBody p={0}>
              <LinkOverlay as={Link} href="/property-list/12">
              <Image
                src='https://images.unsplash.com/photo-1585996950364-1975d93bd896?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=383&q=80'
                alt="Green double couch with wooden legs"
                width={320}
                height={200}
                className="rounded-t-md"
              />
              </LinkOverlay>
              <Stack spacing="3" p={5} textAlign={'center'}>
              <HStack>
              <Tag 
                size={'md'}
                borderRadius='full'
                variant='solid'
                colorScheme='green'
                >
                <TagLabel>Taif</TagLabel>
              </Tag>
              </HStack>
              <LinkOverlay as={Link} href="/property-list/12">
                <Text fontWeight={500}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis</Text>
                </LinkOverlay>
              </Stack>
            </CardBody>
            
            
          </Card>
          
          </LinkBox>

          <LinkBox>
          <Card maxW="sm" borderTopRadius={5} shadow={'md'}>
            <CardBody p={0}>
              <LinkOverlay as={Link} href="/property-list/12">
              <Image
                src='https://images.unsplash.com/photo-1611080870386-8be9a7663098?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                alt="Green double couch with wooden legs"
                width={320}
                height={200}
                className="rounded-t-md"
              />
              </LinkOverlay>
              <Stack spacing="3" p={5} textAlign={'center'}>
              <HStack>
              <Tag 
                size={'md'}
                borderRadius='full'
                variant='solid'
                colorScheme='green'
                >
                <TagLabel>Riyadh</TagLabel>
              </Tag>
              </HStack>
              <LinkOverlay as={Link} href="/property-list/12">
                <Text fontWeight={500}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis</Text>
                </LinkOverlay>
              </Stack>
            </CardBody>
            
            
          </Card>
          
          </LinkBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
