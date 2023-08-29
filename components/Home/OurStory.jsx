import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    Box,
    useColorMode,
  } from '@chakra-ui/react';
  import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from 'react-icons/io5';
  
 
  const Feature = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };
  
  export default function Story() {
    const { colorMode, toggleColorMode } = useColorMode();
    console.log(colorMode)
    return (
      <Box bgColor={'white'} my={5}>
        <Container maxW={'5xl'} py={12} bg={'white'}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={'uppercase'}
              color={'blue.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}>
              Our Story
            </Text>
            <Heading>About Us</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
            We are a Saudi company based in Riyadh. We were founded by 4 partners; with four different backgrounds, One is an engineer with a career in real estate asset management, one with an IT background, another with marketing and advertising experience, and the last one an entrepreneur.
            </Text>
            <Heading textAlign={'right'}>نبذة عن "دائما"</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
            "دائما" شركة سعودية مقرها الرياض. أسسها أربعة شركاء بخلفيات عملية مختلفة. اولهم مهندس بحياة عملية اغلبها في إدارة الممتلكات، و الثاني متخصص في التقنية، و الثالث ذو باع طويل في التسويق و الإعلان، و الرابع رائد أعمال.
            </Text>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={
                'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              }
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
      </Container>
      </Box>
    );
  }
