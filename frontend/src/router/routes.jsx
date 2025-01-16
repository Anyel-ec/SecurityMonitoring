import { lazy } from 'react';
import { InstallationProvider, useInstallation } from '../hooks/contexts/useRoutesWarpper.context';
import { Navigate } from 'react-router-dom';
import PublicRoute from '../hooks/guards/PublicRoute';
import PrivateRoute from '../hooks/guards/ProtectedRoute';

const ConfigAlert = lazy(() => import('../pages/ConfigAlert/ConfigAlert'));
const Instalation = lazy(() => import('../pages/Instalation/Instalation'));
const Home = lazy(() => import('../pages/Home/Home'));
const Profile = lazy(() => import('../pages/Authentication/profile/Profile'));
const Login = lazy(() => import('../pages/Authentication/login/Login'));
const RecoveryPassword = lazy(() => import('../pages/Authentication/recovery-password/RecoveryPassword'));
const Active = lazy(() => import('../pages/Activate/Activate.jsx'));
const ERROR404 = lazy(() => import('../pages/Error/Error404'));
const ERROR500 = lazy(() => import('../pages/Error/Error500'));
// Componente para manejar redirecciones basadas en el estado de instalación
const ProtectedRoute = ({ children, requiresInstallation }) => {
    const isInstalled = useInstallation();

    if (!isInstalled && !requiresInstallation) {
        return <Navigate to="/" replace />;
    }

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
            <InstallationProvider>
                <ProtectedRoute requiresInstallation={true}>
                    <Instalation />
                </ProtectedRoute>
            </InstallationProvider>
        ),
        layout: 'blank',
    },
    {
        path: '/inicio',
        element: (
            <InstallationProvider>
                <ProtectedRoute requiresInstallation={false}>
                    <PrivateRoute
                        element={<Home />}
                    />
                </ProtectedRoute>
            </InstallationProvider>
        ),
    },


    // Provicional
    {
        path: '/instalacion',
        element: (
            <InstallationProvider>
                <ProtectedRoute requiresInstallation={false}>
                    <Instalation />
                </ProtectedRoute>
            </InstallationProvider>
        ),
        layout: 'blank',
    },


    {
        path: '/login',
        element: (
            <InstallationProvider>
                <ProtectedRoute requiresInstallation={false}>
                    <PublicRoute
                        element={<Login />}
                    />
                </ProtectedRoute>
            </InstallationProvider>
        ),
        layout: 'blank',
    },
    {
        path: '/perfil',
        element: (
            <InstallationProvider>
                <ProtectedRoute requiresInstallation={false}>
                    <PrivateRoute
                        element={<Profile />}
                    />
                </ProtectedRoute>
            </InstallationProvider>
        ),
    },
    {
        path: '/recuperar-clave',
        element: (
            <InstallationProvider>
                <ProtectedRoute requiresInstallation={false}>
                    <PublicRoute
                        element={<RecoveryPassword />}
                    />
                </ProtectedRoute>
            </InstallationProvider>
        ),
        layout: 'blank',
    },
    {
        path: '/alertas',
        element: (
            <InstallationProvider>
                <ProtectedRoute requiresInstallation={false}>
                    <PrivateRoute
                        element={<ConfigAlert />}
                    />
                </ProtectedRoute>
            </InstallationProvider>
        ),
    },
    {
        path: '/activacion',
        element: (
            <InstallationProvider>
                <ProtectedRoute requiresInstallation={false}>
                    <PrivateRoute
                        element={<Active />}
                    />
                </ProtectedRoute>
            </InstallationProvider>
        ),
    },
    {
        path: '/500',
        element: (
            <ERROR500 />
        ),
        layout: 'blank',
    },
    {
        path: '*',
        element: (
            <ERROR404 />
        ),
        layout: 'blank',
    },
];

export { routes };
