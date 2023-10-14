import CustomChart from '@/components/DashboardChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Sidebar from '@/components/Sidebar';
import { Box, Flex, HStack, Input, Select, Spacer } from '@chakra-ui/react';
import { Pie, Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { cookies } from 'next/headers';
import { getUser } from '@/utility/authentication';
import { useEffect, useState } from 'react';
import { baseUrl } from '@/utility/baseURL';
import RequireAuth from '@/components/auth/TokenExpaireCheck';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const userData = {
    labels: ['Totol Number of Regular user', 'Total Number of Active Paid MemberShip'],
    datasets: [
      {
        label: 'Number of User',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
      
    ],
};
// const users = ['jon','devid']


export const membershipData = {
    labels: ['Totol Number of Regular user', 'Total Number of Active Paid MemberShip'],
    datasets: [
      {
        label: 'Number of User',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
      
    ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
const labels = ['Bangladesh','India','USA', 'UK', 'Bangladesh','India','USA', 'UK']

export const realeasteddata = {
  labels,
  datasets: [
    {
      label: '',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(54, 162, 235, 1)',
    }
  ],
};



function UserList() {
  const [users, setUsers] = useState([])
  const [usertype, setUsertype] = useState('')
  const [changeUser, setChangeUser] = useState('')
  const {userType}  =getUser()
  useEffect(()=>{
    setUsertype(userType)
    if(userType==='Admin'){

      fetch(baseUrl.defaults.baseURL+'/all-user/')
      .then(res=>res.json())
      .then(data=>{
        let u = []
        data.map((item)=>u.push({ key: item.username, value: item.id.toString() }))
        setUsers(u)
      })
    }
  },[])

  useEffect(()=>{
    console.log(changeUser)
  },[changeUser])

  const handleChange = (e)=>{
    const {value} = e.target
    console.log(value)
    setChangeUser(value)
  }
  return (
    <div className="mt-24">
      <div>
        <Sidebar />
      </div>
      <div className="ml-0 md:ml-72">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 px-3">
          {usertype==='Admin' && <div className="pb-4 bg-white dark:bg-gray-900">
            <Select placeholder='Select User' w={'50%'} mb={'2rem'} onChange={handleChange}>
                {users.map((name, i)=><option value={name.value} key={i}>{name.key}</option>)}
            </Select>
          </div>}
          {usertype==='Admin'?
          <div>
          <Flex justifyContent={'space-between'}>
            <Box w={'40%'}>

              <CustomChart ChartType={<Pie data={userData} />}/>
            </Box>
            <Box w={'40%'}>

              <CustomChart ChartType={<Pie data={userData} />}/>
            </Box>
          </Flex>
          <HStack gap={'1rem'} mt={'2rem'}>
            <CustomChart ChartType={<Bar data={realeasteddata}/>}/>
            <CustomChart ChartType={<Bar data={realeasteddata}/>}/>
          </HStack>
          </div>
          :
          <div>
          <Flex justifyContent={'space-between'}>
            
            <Box w={'40%'}>

              <CustomChart ChartType={<Pie data={userData} />}/>
            </Box>
          </Flex>
          <HStack gap={'1rem'} mt={'2rem'}>
            <CustomChart ChartType={<Bar data={realeasteddata}/>}/>
            <CustomChart ChartType={<Bar data={realeasteddata}/>}/>
          </HStack>
          </div>}
        </div>

      </div>
    </div>
  )
}


export default RequireAuth(UserList)