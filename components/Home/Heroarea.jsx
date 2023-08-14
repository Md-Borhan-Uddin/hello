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
    Select,
    useToast,
  } from '@chakra-ui/react';
import Statistics from './Statics';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
  
  export default function WithBackgroundImage() {
    const toast = useToast()
    const router = useNavigate()
    const [type, setType] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const searchClick = ()=>{
      if(type==""){
        toast({
          
            title: 'Select Search Type',
            status: 'error',
            duration: 5000,
            isClosable: true,
          
        })
        return
      }
      if(searchValue==""){
        toast({
          
            title: type+' value not fill ',
            status: 'error',
            duration: 5000,
            isClosable: true,
          
        })
        return
      }

      router(`/property?type=${type}&value=${searchValue}`)
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
                <InputGroup size={'lg'} >
                  <Select 
                    placeholder='Type' 
                    width={'200px'}
                    value={type}
                    name='type'
                    onChange={(e)=>setType(e.target.value)}
                  >
                    <option value='ID'>ID</option>
                    <option value='floor_number'>Floor Number</option>
                  </Select>
                    <Input 
                      placeholder='Find your Home' 
                      variant={'filled'} 
                      focusBorderColor={'rgb(38, 220, 118)'} 
                      value={searchValue}
                      name='searchValue'
                      onChange={(e)=>setSearchValue(e.target.value)}
                    />
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