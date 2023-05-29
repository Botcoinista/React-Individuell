import React from 'react'
import RootLayout from './layouts/RootLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home' 
import Login from './pages/Login/Login'
import ProductList from './pages/ProductList/ProductList'



const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/productlist',
          element: <ProductList />
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />

  )
}

export default App