import { lazy } from 'react';
import { useInstallation } from '../hooks/contexts/useRoutesWarpper.context';
import { Navigate } from 'react-router-dom';

const Instalation = lazy(() => import('../pages/Instalation/Instalation'));
const Home = lazy(() => import('../pages/Home/Home'));
const Profile = lazy(() => import('../pages/Authentication/Profile'));
const Login = lazy(() => import('../pages/Authentication/Login'));
const ERROR404 = lazy(() => import('../pages/Error/Error404'));

// Componente para manejar redirecciones basadas en el estado de instalación
const ProtectedRoute = ({ children, requiresInstallation }) => {
    const isInstalled = useInstallation();

    // Si requiere instalación y no está instalada, redirige a instalación
    if (!isInstalled && !requiresInstallation) {
        return <Navigate to="/" replace />;
    }

    // Si ya está instalada y se intenta acceder a la instalación, redirige al inicio
    if (isInstalled && requiresInstallation) {
        return <Navigate to="/inicio" replace />;
    }

    return children;
};

// Rutas
const routes = [
    {
        path: '/',
        element: (
            <ProtectedRoute requiresInstallation={true}>
                <Instalation />
            </ProtectedRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/inicio',
        element: (
            <ProtectedRoute requiresInstallation={false}>
                <Home />
            </ProtectedRoute>
        ),
    },

    
    // Provicional
    {
        path: '/instalacion',
        element: (
            <ProtectedRoute requiresInstallation={false}>
                <Instalation />
            </ProtectedRoute>
        ),
        layout: 'blank',
    },


    {
        path: '/login',
        element: (
            <ProtectedRoute requiresInstallation={false}>
                <Login />
            </ProtectedRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/perfil',
        element: (
            <ProtectedRoute requiresInstallation={false}>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: (
            <ProtectedRoute requiresInstallation={false}>
                <ERROR404 />
            </ProtectedRoute>
        ),
        layout: 'blank',
    },
];

export { routes };
