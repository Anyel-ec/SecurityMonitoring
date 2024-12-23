// Renderiza los componentes cuando sean llamados
import { lazy } from 'react';

const Instalation = lazy(() => import('../pages/Instalation/Instalation'));
const Index = lazy(() => import('../pages/Index'));
const Profile = lazy(() => import('../pages/Authentication/Profile'));
const Login = lazy(() => import('../pages/Authentication/Login'));
const ERROR404 = lazy(() => import('../pages/Error/Error404'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Instalation />,
        layout: 'blank',
    },
    {
        path: '/inicio',
        element: <Index />,
    },
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/perfil',
        element: <Profile />,
    },
    {
        path: '*',
        element: <ERROR404 />,
        layout: 'blank',
    },
];

export { routes };
