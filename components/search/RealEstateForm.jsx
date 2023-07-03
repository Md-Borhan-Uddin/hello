import { Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const fields = [
    {
        "label":"ID",
        "type":"TextBox"
    },
    {
        "label":"Real Estate Name",
        "type":"TextBox"
    },
    {
        "label":"Creation Profile Date",
        "type":"DatePicker"
    },
    {
        "label":"Country",
        "type":"DropDownList"
    },
    {
        "label":"City",
        "type":"DropDownList"
    },
    {
        "label":"Real Estate Type",
        "type":"DropDownList"
    },
    {
        "label":"Number of Floors",
        "type":"TextBox"
    },
    {
        "label":"Owner's First Name",
        "type":"TextBox"
    },
    {
        "label":"Owner's Last Name",
        "type":"TextBox"
    },
    {
        "label":"Owner's User Name",
        "type":"TextBox"
    },

]

export default function RealEstateForm() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Flex flex={1} gap={3} flexWrap={'wrap'}>
        {fields.map((item,i)=>{
            
            return(
                <div key={i}>
                    {item.type==="TextBox" && <FormControl>
                        <Input placeholder={item.label} htmlSize={16}/>
                    </FormControl>}

                    {item.type==="DatePicker" && <FormControl>
                        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={startDate} onChange={(date) => setStartDate(date)} />
                    </FormControl>}

                    {item.type==="DropDownList" && <FormControl>
                        <Select placeholder={item.label}>
                        <option>Effectiveness Report</option>
                        </Select>
                    </FormControl>}
                </div>
            )
            
            
        })}
      {/* <FormControl>
        <FormLabel>Request Type</FormLabel>
        <Select placeholder='Request Type'>
          <option>Effectiveness Report</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Submission Date</FormLabel>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </FormControl>

      <FormControl>
        <FormLabel>User Name</FormLabel>
        <Input placeholder='Initiator User Name' />
      </FormControl>

      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input placeholder='Initiator First Name' />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input placeholder='Initiator Last Name' />
      </FormControl>

      <FormControl>
        <FormLabel>Assignee</FormLabel>
        <Input placeholder='Assignee' />
      </FormControl>

      <FormControl>
        <FormLabel>Last Action Date</FormLabel>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </FormControl> */}
    </Flex>
  )
}


/*


*/
