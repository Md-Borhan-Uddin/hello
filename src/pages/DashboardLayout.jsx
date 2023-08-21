import Sidebar from '../../components/sidebar/Sidebar'
import React from 'react'
import Layout from './Layout'
import { Box } from '@chakra-ui/react'
import Footer from '../../components/dashboard/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetNotificationQuery } from '../../data/notification/notificationService'
import { setNotification } from '../../data/notification/notificationSlice'
import { useDispatch } from 'react-redux'
import { getUser } from '../../utility/authentication'
import { useGetUserQuery } from '../../data/auth/service/userServide'
import { setActiveUser } from '../../data/auth/slice/activeUserSlice'

export default function DashboardLayout() {
  const {access_token} = getUser()
  const dispatch = useDispatch();
  // const {data:activeUser, isSuccess:userSuccess, isLoading} = useGetUserQuery(access_token);
  // const {data:notification, isSuccess:notifiSuccess} = useGetNotificationQuery()
  // useEffect(()=>{
  //   dispatch(setNotification({notification}))
  //   // dispatch(setActiveUser({token:access_token,user:activeUser}))
  // },[])
  return (
    <Layout>

      <Sidebar>
        <Box>
          <Box>
          <Outlet />

          </Box>
          <Box>
            <Footer />
          </Box>

        </Box>
      </Sidebar>
    </Layout>
  )
}
