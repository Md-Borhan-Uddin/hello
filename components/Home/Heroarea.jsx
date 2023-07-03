import { SearchIcon } from '@chakra-ui/icons';
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
    Input,
    InputGroup,
    InputRightAddon,
    Box,
  } from '@chakra-ui/react';
import Statistics from './Statics';
import { useNavigate } from 'react-router-dom';
  
  export default function WithBackgroundImage() {
    const router = useNavigate()
    const searchClick = ()=>{
        router.push('/property-list')
    }
    return (
      <Flex
      position={'relative'}
        w={'full'}
        h={'80vh'}
        backgroundImage={
          'url(https://images.unsplash.com/photo-1524026986132-000404263b59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'center'} spacing={6}>
            <Text
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '3xl', md: '5xl' })}>
              Find Your New Home
            </Text>
            <Text
              color={'white'}
              fontWeight={500}
              mt={0}
              lineHeight={.2}
              textAlign={'center'}
              textTransform={'uppercase'}>
              Let’s find a home that’s perfect for you
            </Text>
            <Box bg={'white'} w={'full'} borderRadius={7}>
                <InputGroup size={'lg'}>
                    <Input placeholder='Find your Home' variant={'filled'} focusBorderColor={'rgb(38, 220, 118)'} />
                    <InputRightAddon bgColor={'rgb(38,220,118)'} cursor={'pointer'} as={'button'} onClick={searchClick}>
                        <SearchIcon />
                    </InputRightAddon>
                
                </InputGroup>
            </Box>
            
          </Stack>
        </VStack>
        <Statistics /> 
      </Flex>
    );
  }