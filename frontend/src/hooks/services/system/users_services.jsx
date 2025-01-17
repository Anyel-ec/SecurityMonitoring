import { useState, useCallback } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { url_users, url_roles } from '../static/useApiUrl';


// Servicio para obtener todos los roles
export const useGetAllRolesService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log(url_roles);
    const content = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`${url_roles}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLoading(false);
            return response.data.result; // Asegúrate de que el backend devuelve los roles en `result`
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            setError(errorMessage);
            setLoading(false);
            return [];
        }
    }, []);

    return { content, loading, error };
};


// Servicio para crear un usuario
export const useCreateUserService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const content = useCallback(async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post(`${url_users}/create`, userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            setError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    }, []);

    return { content, loading, error };
};

// Servicio para obtener todos los usuarios
export const useGetAllUsersService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const content = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`${url_users}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            setError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    }, []);

    return { content, loading, error };
};

// Servicio para actualizar un usuario
export const useUpdateUserService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const content = useCallback(async (userId, userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.put(`${url_users}/update/${userId}`, userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            setError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    }, []);

    return { content, loading, error };
};

// Servicio para eliminar un usuario
export const useDeleteUserService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const content = useCallback(async (userId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.delete(`${url_users}/delete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            setError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    }, []);

    return { content, loading, error };
};


