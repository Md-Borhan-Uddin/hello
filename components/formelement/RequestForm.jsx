import { Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function RequestForm({wrap}) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Flex flex={1} gap={3} flexWrap={'wrap'}>
      <div>
      <FormControl>
        <Select placeholder='Request Type'>
          <option>Effectiveness Report</option>
        </Select>
      </FormControl>
    </div>
    <div>
      <FormControl>
        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={startDate} minDate={new Date()} showDisabledMonthNavigation onChange={(date) => setStartDate(date)} />
      </FormControl>
    </div>
    <div>
      <FormControl>
        <Input placeholder='Initiator User Name' htmlSize={16}/>
      </FormControl>
      </div>
    <div>
      <FormControl>
        <Input placeholder='Initiator First Name'  htmlSize={16}/>
      </FormControl>
      </div>
    <div>
      <FormControl isRequired>
        <Input placeholder='Initiator Last Name'  htmlSize={16}/>
      </FormControl>
      </div>
    <div>
      <FormControl>
        <Input placeholder='Assignee'  htmlSize={16}/>
      </FormControl>
      </div>
    <div>
      <FormControl>
        <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={startDate} maxDate={new Date()} showDisabledMonthNavigation onChange={(date) => setStartDate(date)} />
      </FormControl>
      </div>
    </Flex>
  )
}
