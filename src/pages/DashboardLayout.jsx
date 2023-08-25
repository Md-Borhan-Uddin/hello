import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { useGetNotificationQuery } from '../../data/notification/notificationService'
import { setNotification } from '../../data/notification/notificationSlice'
import { useDispatch } from 'react-redux'
import { getUser } from '../../utility/authentication'
import { useGetUserQuery } from '../../data/auth/service/userServide'
import { setActiveUser } from '../../data/auth/slice/activeUserSlice'
const Sidebar = React.lazy(()=>import('../../components/sidebar/Sidebar'))
const Layout  = React.lazy(()=>import('./Layout'))
const Footer = React.lazy(()=>import('../../components/dashboard/Footer'))

export default function DashboardLayout() {
  const {access_token} = getUser()
  const dispatch = useDispatch();
  const {data:activeUser, isSuccess:userSuccess, isLoading} = useGetUserQuery(access_token);
  const {data:notification, isSuccess:notifiSuccess} = useGetNotificationQuery()
  useEffect(()=>{
    dispatch(setNotification({notification}))
    dispatch(setActiveUser({token:access_token,user:activeUser}))
  },[])
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
