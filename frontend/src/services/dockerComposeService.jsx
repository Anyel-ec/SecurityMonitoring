import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

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



