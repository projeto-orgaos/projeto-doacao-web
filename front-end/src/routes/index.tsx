import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from '@pages/home/page'
import { FullWidthDoubleStack, ContainerDoubleStack, ToggleAsideBar, NavSidebar, DrawerNavigation, ToggleDrawerNavigation } from '@pages/layouts'
import { Projects, Stats } from '@pages/widgets'
import LoginPage from '@src/pages/auth/LoginPage'
import RegisterPage from '@src/pages/auth/RegisterPage'

const router = createBrowserRouter([
    {
        path: '/',
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
        path: '/layouts/full-width-double-stack',
        element: <FullWidthDoubleStack />
    },
    {
        path: '/layouts/container-double-stack',
        element: <ContainerDoubleStack />
    },
    {
        path: '/layouts/toggle-sidebar',
        element: <ToggleAsideBar />
    },
    {
        path: '/layouts/nav-toggle-sidebar',
        element: <NavSidebar />
    },
    {
        path: '/layouts/nav-toggle-drawer-sidebar',
        element: <ToggleDrawerNavigation />
    },
    {
        path: '/layouts/nav-drawer-sidebar',
        element: <DrawerNavigation />
    },
    {
        path: '/widgets/projects',
        element: <Projects />
    },
    {
        path: '/widgets/stats',
        element: <Stats />
    }
])

export default function Router () {
    return <RouterProvider router={router} />
}