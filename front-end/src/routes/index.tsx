import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from '@src/pages/auth/LoginPage'
import RegisterPage from '@src/pages/auth/RegisterPage'
import Home from '@src/pages/home/homepage'
import DoadoresPage from '@src/pages/doadores/doadoresPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/registro',
        element: <RegisterPage  />
    },
    {
        path: '/doadores',
        element: <DoadoresPage />
    },
    
])

export default function Router () {
    return <RouterProvider router={router} />
}