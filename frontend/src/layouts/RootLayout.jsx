import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = ({ user, setUser }) => {
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Outlet />
    </div>
  )
}

export default RootLayout