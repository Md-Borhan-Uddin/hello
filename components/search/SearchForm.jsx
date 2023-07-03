import { Box, Flex, FormControl, FormLabel, Text, Select, Input, useBreakpointValue, Button, useBreakpoint, useDisclosure, Stack } from "@chakra-ui/react";

import CustomModal from '../UserEditModal'
import { useState } from "react";
import RequestForm from "../formelement/RequestForm";
import RealEstateForm from "./RealEstateForm";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchForm() {
  const [selectvalue, setSelectValue] = useState('')
  const windowsize = useBreakpointValue({md:true,lg:true})
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box mb={20}>
      <Stack>

        <Button display={useBreakpointValue({md:'none'})} bgColor={'green.200'} variant={'solid'} rightIcon={<SearchIcon />} onClick={onOpen}>Filter</Button>
      </Stack>
      {windowsize && <form action="">
      
        
        <FormControl>
          <FormLabel>Search Type</FormLabel>
          <Select placeholder="Select" w={40} value={selectvalue} onChange={(e)=>setSelectValue(e.target.value)}>
            
            <option>Request</option>
            <option>Real Estate</option>
          </Select>
        </FormControl>
        <Box gap={5} mt={7}>
          {selectvalue==='Request' && <RequestForm wrap='nowrap'/>}
          {selectvalue==='Real Estate' && <RealEstateForm />}

        </Box>
      </form>}

    <CustomModal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} title="Search" saveBtnLabel='Search' cancelBtnLabel='Reset'>
      <form action="">
        
          
        <FormControl>
          <FormLabel>Search Type</FormLabel>
          <Select placeholder="Select country" w={40} value={selectvalue} onChange={(e)=>setSelectValue(e.target.value)}>
            
            <option>Request</option>
            <option>Real Estate</option>
          </Select>
        </FormControl>
        <Box gap={5} mt={7}>
          {selectvalue==='Request' && <RequestForm wrap='wrap'/>}
          {selectvalue==='Real Estate' && <RealEstateForm />}

        </Box>
      </form>
    </CustomModal>
    
    </Box>
  )
}
