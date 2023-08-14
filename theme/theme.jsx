import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./Input";


export const theme = extendTheme({
  components: { Input: inputTheme },
    fonts:{
        heading:`'Poppins', sans-serif`,
        body:`'Montserrat', sans-serif`
    },
    colors: {
        primary: {
          100:"#bdf5d6",
          200:"#91eebb",
          300:"#64e79f",
          400:"#38e084",
          500:"#1fc76b",
          600:"#189b53",
        },
        secondary:{
            100:"#5b6a76",
            200:"#435362",
            300:"#2b3e4d",
            400:"#15293a",
            500:"#011220",
            600:"#011627",
        }
      },
})