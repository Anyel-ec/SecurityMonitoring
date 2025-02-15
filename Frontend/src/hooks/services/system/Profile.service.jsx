import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { url_profile } from '../static/useApiUrl';

// Función para obtener los detalles del usuario
export const useProfileUserService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Memoizamos la función `content` con useCallback
    const content = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`${url_profile}`);
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


// Función para actualizar los detalles del usuario
export const useUpdateProfileUserService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Memoizamos la función `content` con useCallback
    const content = useCallback(async (formdata) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.put(`${url_profile}/update`, formdata);
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


// Función para actualizar la contraseña del usuario
export const useUpdatePasswordUserService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Memoizamos la función `content` con useCallback
    const content = useCallback(async (formdata) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.put(`${url_profile}/update-password`, formdata);
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