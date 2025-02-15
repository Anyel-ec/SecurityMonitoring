import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { url_recovery } from '../static/useApiUrl';
// Función para generar el codigo de la contraseña
export const useResetPasswordCodeService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Función `content` para realizar la solicitud de inicio de sesión
    const content = async (formdata) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(`${url_recovery}/recovery_password`, formdata);
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
// Función para verificar el codigo de la contraseña
export const useResetPasswordUserVerifyCodeService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Función `content` para realizar la solicitud de inicio de sesión
    const content = async (formdata) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(`${url_recovery}/verify_code`, formdata);
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
// Función para restalecer contraseña
export const useResetPasswordUserTokenService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Función `content` para realizar la solicitud de inicio de sesión
    const content = async (formdata) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(`${url_recovery}/reset_password`, formdata);
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
