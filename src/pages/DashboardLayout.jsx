import Sidebar from '../../components/sidebar/Sidebar'
import React from 'react'
import Layout from './Layout'
import { Box } from '@chakra-ui/react'
import Footer from '../../components/dashboard/Footer'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  console.log('dashboard layout')
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
