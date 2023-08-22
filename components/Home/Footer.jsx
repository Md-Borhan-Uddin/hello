import {Link} from 'react-router-dom'

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';



const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      zIndex={2000000}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <img src='/logo.png' width={120} height={50} alt="logo"/>
            </Box>
            <Text fontSize={'sm'}>
              © 2023 . All rights reserved
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <Link to="#">Overview</Link>
            <Link to="#">Features</Link>
            <Link to="#">Tutorials</Link>
            <Link to="#">Pricing</Link>
            <Link to="#">Releases</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link to="/about">About</Link>
            <Link to="#">Press</Link>
            <Link to="#">Careers</Link>
            <Link to="/contact">Contact</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link to="#">Help Center</Link>
            <Link to="/terms-and-conditions">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Follow Us</ListHeader>
            <Link to="#">Facebook</Link>
            <Link to="#">Twitter</Link>
            <Link to="#">Dribbble</Link>
            <Link to="#">Instagram</Link>
            <Link to="#">LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}