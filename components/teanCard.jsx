'use client'

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'

export default function TeamCard({image,name,position,email}) {
  return (
    <Center py={6} minW={'200px'}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}>
        
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              image?image:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            css={{
              border: '2px solid rgb(38 220 118)',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
              {name}
            </Heading>
            <Text color={'gray.500'}>{position}</Text>
            <Text color={'gray.500'}>{email}</Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  )
}