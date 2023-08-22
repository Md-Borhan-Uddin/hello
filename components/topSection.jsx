
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
} from '@chakra-ui/react'

export default function TopSection({title, text}) {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
        //   spacing={{ base: 8, md: 14 }}
          py={{ base: 7, md: 10 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            >
                {title}
          </Heading>
          <Text color={'gray.500'}>
            {text}
          </Text>
          
        </Stack>
      </Container>
    </>
  )
}

