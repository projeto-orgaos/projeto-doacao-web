import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from '@src/pages/auth/LoginPage'
import RegisterPage from '@src/pages/auth/RegisterPage'
import Home from '@src/pages/home/homepage'

import ReceptoresPage from '@src/pages/receptor/receptor-page'

import DoadoresPage from '@src/pages/doador/doador-page'

import UsuariosPage from '@src/pages/users/users-page'
import RegistrarUsuarioPage from '@src/pages/users/registrar-usuario'

import OrgaosPage from '@src/pages/orgaos/orgaos-page'

import HospitaisPage from '@src/pages/hospitais/hospitais-page'
import RegistrarHospitalPage from '@src/pages/hospitais/registro-hospital'
import RegisterOrgaoPage from '@src/pages/orgaos/registrar-orgaos'
import EditUserPage from '@src/pages/users/editar-usuario'
import EditHospitalPage from '@src/pages/hospitais/editar-hospital'
import ReceptoresDetailPage from '@src/pages/receptor/detalhes-receptores'
import DoadoresDetailsPage from '@src/pages/doador/detalhes-doador'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/home',
        element: <Home />
    },

    //auth
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/registro',
        element: <RegisterPage  />
    },

    //usuários
    {
        path: '/usuarios',
        element: <UsuariosPage />
    },
    {
        path: '/registrar-usuario',
        element: <RegistrarUsuarioPage />
    },
    {
        path: '/editar-usuario/:id',
        element: <EditUserPage />
    },
    {
        path: '/receptores',
        element: <ReceptoresPage />
    },
    {
        path: '/receptores/:id',
        element: <ReceptoresDetailPage />
    },
    {
        path: '/doadores',
        element: <DoadoresPage />
    },
    {
        path: '/doadores/:id',
        element: <DoadoresDetailsPage />
    },

    //Orgãos
    {
        path: '/orgaos',
        element: <OrgaosPage />
    },
    {
        path: '/registrar-orgao',
        element: <RegisterOrgaoPage />
    },

    //Hospitais
    {
        path: '/hospitais',
        element: <HospitaisPage />
    },
    {
        path: '/registrar-hospital',
        element: <RegistrarHospitalPage />
    },
    {
        path: '/editar-hospital/:id',
        element: <EditHospitalPage />
    },
    
])

export default function Router () {
    return <RouterProvider router={router} />
}