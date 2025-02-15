import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axios/axiosInstance';
import { url_alert_rules } from '../static/useApiUrl';
// Función para obtener los datos de las reglas de alerta
export const useAlertRulesService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Función `content` para realizar la solicitud de inicio de sesión
    const content = async (database) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`${url_alert_rules}/alerting_rules_${database.toLowerCase()}.yml`);
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
// Función para actualizar las reglas de alerta
export const useAlertRulesUpdateService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Función `content` para realizar la solicitud de inicio de sesión
    const content = async (selectedDatabase, yamlData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.put(`${url_alert_rules}/alerting_rules_${selectedDatabase.toLowerCase()}.yml`, { yamlContent: yamlData });
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
