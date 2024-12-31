import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { url_auth } from '../static/useApiUrl';

// Función para iniciar sesión
export const useAuthService = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función `content` para realizar la solicitud de inicio de sesión
    const content = async (username, password) => {
        setLoading(true);
        setError(null);

        try {
            console.log(username, password)
            const response = await axiosInstance.post(`${url_auth}/login`, { username, password });
            const result = response.result;

            // Guardar el token en localStorage si está en la respuesta
            if (result && result.httpCode === 200 ) {
                localStorage.setItem('token', result);
            }

            setLoading(false);
            return result;

        } catch (error) {
            setError(error.response ? error.response.data.msg : error.message);
            setLoading(false);
            return undefined;
        }
    };

    return { content, loading, error };
};

// Función para obtener los detalles del usuario
export const useDetailsUserService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Memoizamos la función `content` con useCallback
    const content = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`${url_auth}/userDetails`);
            const result = response.result;

            setLoading(false);
            return result;

        } catch (error) {
            setError(error.response ? error.response.data.msg : error.message);
            setLoading(false);
            return undefined;
        }
    }, []); // Dependencias vacías, la función se memoiza y no cambia a menos que cambien las dependencias

    return { content, loading, error };
};

// Función para cerrar sesión
export const useLogoutService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función `content` para cerrar sesión
    const content = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`${url_auth}/logout`);
            const result = response.result;

            // Eliminar el token del localStorage
            localStorage.removeItem('token');

            setLoading(false);
            return result;

        } catch (error) {
            setError(error.response ? error.response.data.msg : error.message);
            setLoading(false);
            return undefined;
        }
    };

    return { content, loading, error };
}

// Función para verificar el token
export const useVerifyToken = () => {
    const [isValid, setIsValid] = useState(null);
    const { content } = useDetailsUserService();

    useEffect(() => {
        const verify = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                // No hay token, establecer isValid en false
                setIsValid(false);
                return;
            }

            // Existe un token, procedemos a verificar con la API
            const result = await content();

            if (!result || result.msg === "Token revocado") {
                localStorage.removeItem('token');
                setIsValid(false);
                return;
            }

            // Verificamos que `exp` existe en `result`
            if (!('exp' in result) || !result.exp) {
                localStorage.removeItem('token');
                setIsValid(false);
                return;
            }

            const { exp } = result;

            const currentTime = Math.floor(Date.now() / 1000);

            if (Number(exp) < currentTime) {
                localStorage.removeItem('token');
                setIsValid(false);
                return;
            }

            setIsValid(true);
        };

        verify();
    }, []); // Arreglo de dependencias vacío

    return { isValid };
};

