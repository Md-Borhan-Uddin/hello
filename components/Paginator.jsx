import React, { useState } from 'react'
import {Box, Button, ButtonGroup, Flex, HStack, IconButton, Text} from '@chakra-ui/react'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'

export default function ({handleNextPage,handlePreviousPage, totalItem,page, isNext, isPrevious}) {
  const isShow = totalItem/10>1
  return (
    <>
    {isShow&&<Box>
        <Flex justifyContent={'flex-end'}>
            <HStack>
                {isPrevious && <IconButton icon={<BsArrowLeftShort />} onClick={handlePreviousPage}/>}
                <Text>Showing {5*page>totalItem?totalItem:5*page} of {totalItem}</Text>
                {isNext && <IconButton icon={<BsArrowRightShort />} onClick={handleNextPage}/> }
            </HStack>
        </Flex>
    </Box>}
    </>
  )
}
