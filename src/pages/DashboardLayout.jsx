import React from 'react'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
const Sidebar = React.lazy(()=>import('../../components/sidebar/Sidebar'))
const Layout  = React.lazy(()=>import('./Layout'))
const Footer = React.lazy(()=>import('../../components/dashboard/Footer'))

export default function DashboardLayout() {
  
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
