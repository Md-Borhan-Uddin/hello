import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    useBreakpointValue
  } from '@chakra-ui/react';
  import { BsPerson } from 'react-icons/bs';
  import { FiServer } from 'react-icons/fi';
  import { GoLocation } from 'react-icons/go';
  

  function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function Statistics() {
    
    return (
      <Box maxW="100vw" display={useBreakpointValue({sm:'none',md:'block'})} mx={'auto'} p={5} px={{ base: 2, sm: 12, md: 17 }} bg={'#ffffffad'}  position={'absolute'} left={'50%'} borderRadius={8} top={'88%'} transform={'translateX(-50%)'}>
       
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Users'}
            stat={'5,000'}
            icon={<BsPerson size={'3em'} />}
          />
          <StatsCard
            title={'House'}
            stat={'1,000'}
            icon={<FiServer size={'3em'} />}
          />
          <StatsCard
            title={'Rent'}
            stat={'7'}
            icon={<GoLocation size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    );
  }