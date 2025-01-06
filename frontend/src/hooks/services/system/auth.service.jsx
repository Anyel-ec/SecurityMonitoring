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
            const response = await axiosInstance.post(`${url_auth}/login`, { username, password });
            const result = response.data;

            // Guardar el token en localStorage si está en la respuesta
            if (result && result.httpCode === 200) {
                localStorage.setItem('token', result.result);
            }

            setLoading(false);
            return result;

        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            setError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
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
            const result = response.data;

            setLoading(false);
            return result;

        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            setError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
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
            const result = response.data;

            // Eliminar el token del localStorage
            localStorage.removeItem('token');

            setLoading(false);
            return result;

        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            setError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    };

    return { content, loading, error };
}

// Función para verificar el token
export const useVerifyToken = () => {
    const [isValid, setIsValid] = useState(null); // Estado para almacenar si el token es válido o no
    const { content } = useDetailsUserService(); // Función para obtener los detalles del usuario desde la API

    useEffect(() => {
        const verify = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                // No hay token, establecer isValid en false
                console.error("Token no encontrado en localStorage");
                setIsValid(false);
                return;
            }

            try {
                // Llamar a la API para obtener los detalles del usuario
                const result = await content();

                // Verificar si la API devolvió una respuesta válida
                if (!result || result.success !== true) {
                    console.warn("Token revocado o respuesta inválida");
                    localStorage.removeItem('token');
                    setIsValid(false);
                    return;
                }

                // Aquí podrías verificar otros datos si fueran necesarios (ejemplo: roles o usuario activo)
                if (result.result && result.result.isActive) {
                    console.log("Token válido y usuario activo");
                    setIsValid(true);
                } else {
                    console.warn("Usuario inactivo o token inválido");
                    localStorage.removeItem('token');
                    setIsValid(false);
                }
            } catch (error) {
                console.error("Error al verificar el token:", error);
                localStorage.removeItem('token');
                setIsValid(false);
            }
        };

        verify();
    }, [content]); // Se ejecuta cuando `content` cambia

    return { isValid };
};


