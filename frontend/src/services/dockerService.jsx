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
