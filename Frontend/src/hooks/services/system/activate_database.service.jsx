import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { url_aletRule } from '../static/useApiUrl';
// Función para obtener los datos de las reglas de alerta
export const useActivateDBService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Función `content` para realizar la solicitud de inicio de sesión
    const content = async (database) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`${url_aletRule}/check-all`);
            const result = response.data;
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
// Función para actualizar las reglas de alerta para todas las bases de datos
export const useUpdateDBService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Función `content` para realizar la solicitud de inicio de sesión
    const content = async (databaseType) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(`${url_aletRule}`, null, {
                params: { databaseType }
            });
            const result = response.data;
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
// Función para eliminar las reglas de alerta para todas las bases de datos
export const useDeleteDBService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const content = async (databaseType) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.delete(`${url_aletRule}`, {
                params: { databaseType }, // Los parámetros deben ir aquí
            });
            const result = response.data;
            console.log("Consola del eliminado de bd", result);
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

// Función para eliminar las reglas de alerta para todas las bases de datos
export const useDockerInstallService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Función `content` para realizar la solicitud de inicio de sesión
    const content = async (databaseType) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/install/docker/install`);
            const result = response.data;
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
