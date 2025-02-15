import { jwtDecode } from 'jwt-decode';

export const getUserRoles = () => {
    const token = localStorage.getItem('token');
    if (!token) return [];

    try {
        const decoded = jwtDecode(token);
        return decoded.roles || [];
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return [];
    }
};

export const hasRole = (requiredRoles) => {
    const userRoles = getUserRoles();
    return requiredRoles.some((role) => userRoles.includes(role));
};
