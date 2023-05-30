import React from 'react'
import RootLayout from './layouts/RootLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home' 
import Login from './pages/Login/Login'
import ProductList from './pages/ProductList/ProductList'
import LoginForm from './pages/Login/Login'



const App = () => {

  const [user, setUser] = React.useState(null)

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
          element: <Login user={user} setUser={setUser} />
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