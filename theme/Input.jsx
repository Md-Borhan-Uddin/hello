import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    background: 'red',
    border: "2px solid",
    borderColor: 'red.500',
  },
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })