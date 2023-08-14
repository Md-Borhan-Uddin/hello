import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useBoolean,
  HStack,
  RadioGroup,
  Radio,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import React, {useState} from "react";

export default function PopoverItem({children}) {
  const [isEditing, setIsEditing] = useBoolean();
  const [color, setColor] = useState("red");
  return (
    <>
      <Popover
        isOpen={isEditing}
        onOpen={setIsEditing.on}
        onClose={setIsEditing.off}
        closeOnBlur={true}
        isLazy
        lazyBehavior="keepMounted"
      >
        <HStack>
          <PopoverTrigger>
            <InputGroup>
                <Input
                color={color}
                w="auto"
                display="inline-flex"
                defaultValue="Popover Anchor"
                />
                <InputRightElement children={isEditing?<ChevronUpIcon fontSize={25}/>:<ChevronDownIcon  fontSize={25}/>} />
            </InputGroup>
          </PopoverTrigger>
        </HStack>

        <PopoverContent>
          <PopoverBody>
            Colors:
            {children}
            {/* <RadioGroup
              value={color}
              onChange={(newColor) => setColor(newColor)}
            >
              <Radio value="red">red</Radio>
              <Radio value="blue">blue</Radio>
              <Radio value="green">green</Radio>
              <Radio value="purple">purple</Radio>
            </RadioGroup> */}
          </PopoverBody> 
          
        </PopoverContent>
      </Popover>
    </>
  );
}
