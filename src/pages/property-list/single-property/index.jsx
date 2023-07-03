import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Grid,
  GridItem,
  Avatar,
  Badge,
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import { useState } from 'react';


const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Ad
aliquid amet at delectus doloribus dolorum expedita hic, ipsum
maxime modi nam officiis porro, quae, quisquam quos
reprehenderit velit? Natus, totam. Lorem ipsum dolor sit amet, consectetur adipisicing elit.Ad
aliquid amet at delectus doloribus dolorum expedita hic, ipsum
maxime modi nam officiis porro, quae, quisquam quos
reprehenderit velit? Natus, totam.`


export default function SingleProperty() {
  const [lessText, setLessText] = useState(true)
  const hideText = () =>{
    setLessText(!lessText)
  }
  const desc = lessText ? text.slice(0,200):text
  return (
    <Container maxW={'7xl'} mt={7}>
      <Box>
      <Grid
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(4, 1fr)'
        gap={2}
      >
        <GridItem rowSpan={2} colSpan={3}>
            <Image
                loading='lazy'
                rounded={'md'}
                alt={'product image'}
                src={
                  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                }
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
              />
        </GridItem>
        <GridItem>
          <Image
                loading='lazy'
              rounded={'md'}
              alt={'product image'}
              src={
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              }
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
            />
        </GridItem>
        <GridItem>
          <Image
                loading='lazy'
              rounded={'md'}
              alt={'product image'}
              src={
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              }
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
            />
        </GridItem>
      </Grid>
      </Box>
      <Flex
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 5 }}
        py={{ base: 18, md: 24 }}>
        <Stack spacing={{ base: 6, md: 10 }} w={'70%'}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              Beautifull Villa
            </Heading>
            <Text
              color={useColorModeValue('gray.500', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              Full Sea View | 2 BR+Maids Room | Prime Location
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }>
            <Box>
              <Text
                mb={4}
                fontSize={'2xl'}
                fontWeight={'500'}>
                Description
              </Text>
              <Text fontSize={'lg'} color={'gray.700'}>
                {desc}
              </Text>
              <Button colorScheme='green' mt={4} onClick={hideText} variant='outline' leftIcon={lessText?<ChevronDownIcon />:<ChevronUpIcon />}> Read More</Button>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Amenities
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Unfurnished</ListItem>
                  <ListItem>Balcony</ListItem>{' '}
                  <ListItem>Private Garden</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Private Pool</ListItem>
                  <ListItem>View of Landmark</ListItem>
                  <ListItem>View of Water</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Property Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Between lugs:
                  </Text>{' '}
                  20 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Bracelet:
                  </Text>{' '}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case:
                  </Text>{' '}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case diameter:
                  </Text>{' '}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Dial color:
                  </Text>{' '}
                  Black
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Crystal:
                  </Text>{' '}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Water resistance:
                  </Text>{' '}
                  5 bar (50 metres / 167 feet){' '}
                </ListItem>
              </List>
            </Box>
          </Stack>

         
        </Stack>
        <VStack w={'30%'}>
          <Box border={'2px solid gray'}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14607.610861801386!2d90.40310325!3d23.75084835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1681135845885!5m2!1sen!2sbd" width="300" height="200" style={{border:'0'}} allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Box>
          <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={
            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          Lindsey James
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @Agent
        </Text>
        

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            color={'white'}
            bg={'rgb(1,22,39)'}
            _focus={{
              bg: 'rgb(1,22,39)',
            }}>
            Message
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'green.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}>
            Call
          </Button>
        </Stack>
      </Box>
        </VStack>
      </Flex>
      
    </Container>
  );
}


