import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const BASE_URL = `${AppEnvironments.baseUrl}/api/v1/docker`;

// Servicio para verificar el estado de Docker
export const checkDockerStatus = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/isActive`);
        return response.data; // Devuelve el objeto de respuesta JSON
    } catch (error) {
        console.error('Error al verificar el estado de Docker:', error);
        throw error;
    }
};

// Servicio para verificar si Docker Compose ya ha sido ejecutado
export const checkIfComposeExecuted = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/hasBeenExecuted`);
        return response.data; // Devuelve el objeto de respuesta JSON
    } catch (error) {
        console.error('Error al verificar si Docker Compose ha sido ejecutado:', error);
        throw error;
    }
};


export const runDockerInstallService = async () => {
    const BASE_URL = AppEnvironments.baseUrl;
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/install/docker/install`);
        return response.data;
    } catch (error) {
        console.error('Error al ejecutar Docker Compose:', error);
        if (error.response?.data) {
            throw new Error(error.response.data.message || 'Error al ejecutar Docker Compose');
        } else {
            throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
        }
    }
};


// New service to check the container status of Grafana and Prometheus
export const checkContainerStatusService = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/checkContainerStatus`);
        return response.data; // Returns the JSON response object
    } catch (error) {
        console.error('Error checking container status:', error);
        if (error.response?.data) {
            throw new Error(error.response.data.message || 'Error checking container status');
        } else {
            throw new Error('Unable to connect to the server. Please check your connection.');
        }
    }
};