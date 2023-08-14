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
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import {Link, useLocation, useParams} from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getUser } from '../../../../utility/authentication';
import { baseURL } from '../../../../utility/baseURL';
import { CustomModal } from '../../../../components/modal';
import VisitorForm from '../../../../components/form/visitorForm';


const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Ad
aliquid amet at delectus doloribus dolorum expedita hic, ipsum
maxime modi nam officiis porro, quae, quisquam quos
reprehenderit velit? Natus, totam. Lorem ipsum dolor sit amet, consectetur adipisicing elit.Ad
aliquid amet at delectus doloribus dolorum expedita hic, ipsum
maxime modi nam officiis porro, quae, quisquam quos
reprehenderit velit? Natus, totam.`

function useQuery() {
  const { search } = useLocation();
  

  return useMemo(() => new URLSearchParams(search), [search]);
}


export default function SingleProperty() {
  const {isOpen,onOpen,onClose} = useDisclosure()
  const query = useParams()
  const search = useQuery()
  const [lessText, setLessText] = useState(false)
  const [realestate, setRealestate] = useState({})
  const hideText = () =>{
    setLessText(!lessText)
  }
  const { userType, access_token } = getUser();
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  useEffect(()=>{
    let url;
    if(search.get('type')==='ID'){
      url = baseURL + `/real-estate/details/?realestate_id=${search.get('value')}`
    }
    else{
      url = baseURL + `/real-estate/details/?number_of_floors=${search.get('value')}`
    }
    fetch(url, { headers: headers })
      .then((res) => res.json())
      .then((data) => {
        console.log('realestate data', data)
        setRealestate(data)
      })
      .catch((error) => {
        console.log(error);
      });
  },[])
  const desc = lessText ? text.slice(0,200):text
  return (
    <Container maxW={'7xl'} mt={7}>
      {realestate?.realestate_id?<Box>
        <Box>
      <Image
        loading='lazy'
        rounded={'md'}
        alt={'product image'}
        src={
          realestate?.photo
        }
        fit={'cover'}
        align={'center'}
        w={'100%'}
        h={'100%'}
      />
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
              {realestate?.name}
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
              <Collapse startingHeight={20} in={lessText}>
                {realestate?.description}
              </Collapse>
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
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14607.610861801386!2d90.40310325!3d23.75084835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1681135845885!5m2!1sen!2sbd" width="300" height="200" style={{border:'0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
            realestate?.user.image
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
          {realestate?.user.first_name} {realestate?.user.last_name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @Agent
        </Text>
        

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
          onClick={onOpen}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            color={'white'}
            bg={'rgb(1,22,39)'}
            _hover={{
              bg: 'rgb(1,22,39)',
            }}>
            Request
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
      </Box>:<Box>
        <Text fontSize={'2xl'} align={'center'}>There is no data found with {search.get('value')} {search.get('type')}</Text>
        </Box>}

      <CustomModal onClose={onClose} isOpen={isOpen} title='Visitor Form'>
        <VisitorForm realestate={realestate} onClose={onClose}/>
      </CustomModal>
      
    </Container>
  );
}


