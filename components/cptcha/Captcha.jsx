import { RepeatClockIcon, Search2Icon } from '@chakra-ui/icons'
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import React from 'react'
import bg from '../../src/assets/captcha-bg.jpeg'





export default function Captcha({value,text, onClick, onChange, error_msg, is_match}) {

  return (
    <div className="mb-3">
            <Box
              backgroundImage={`url(${bg})`}
              bgSize={'cover'}
              bgPosition="center"
              bgRepeat="no-repeat"
              w={'100%'}
              border={'2px solid gray.100'}
              textAlign={'center'}
              fontSize={'1.5rem'}
              fontWeight={600}
              letterSpacing={5}
              fontFamily={'sans-serif'}
              mb={3}
                

            >
                {text}
            </Box>
            
            <InputGroup>
            
                <Input onChange={onChange} type='text' value={value} name='captcha' id='captcha' placeholder='Type Captcha'/>
                <InputRightAddon onClick={onClick} cursor={'pointer'}>
                    <RepeatClockIcon />
                </InputRightAddon>
            </InputGroup>
            {is_match && <p className="text-red-600">{error_msg}</p>}
            
    </div>
  )
}
