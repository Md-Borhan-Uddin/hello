import React from 'react'
import Layout from './Layout'
import Footer from '../../components/Home/Footer'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
    console.log("default layout")
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
