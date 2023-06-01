import React from 'react'
import RootLayout from './layouts/RootLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home' 
import Login from './pages/Login/Login'
import ProductList from './pages/ProductList/ProductList'
import ProductDetails from './pages/ProductDetails.jsx/ProductDetails'
import AddProduct from './pages/AddProduct/AddProduct'
import LoginForm from './pages/Login/Login'
import { useState } from 'react'



const App = () => {

  const [user, setUser] = useState(null)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout user={user} setUser={setUser} />, //
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login user={user} setUser={setUser} /> 
        },
        {
          path: '/productlist',
          element: <ProductList user={user} />
        },
        {
          path: '/productdetails/:productId',
          element: <ProductDetails />
        },
        {
          path: '/add',
          element: <AddProduct />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App