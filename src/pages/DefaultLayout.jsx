import React, { useEffect } from 'react'
import Layout from './Layout'
import Footer from '../../components/Home/Footer'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import { getUser } from '../../utility/authentication'
import { useDispatch } from 'react-redux'
import { setActiveUser } from '../../data/auth/slice/activeUserSlice'
import { useGetUserQuery } from '../../data/auth/service/userServide'

export default function DefaultLayout() {
 
  return (
    <Layout>
        <main style={{maxHeight:'100vh'}}>
            <Navbar />
            <div className="bg-white">
              
              <Outlet />

            </div>
            <Footer />
        </main>
    </Layout>
  )
}
