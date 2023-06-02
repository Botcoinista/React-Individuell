import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const RootLayout = ({ user, setUser }) => {
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default RootLayout