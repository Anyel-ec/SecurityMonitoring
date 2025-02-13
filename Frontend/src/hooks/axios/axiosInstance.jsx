import axios from 'axios';
import { url_base } from '../services/static/useApiUrl';

// Crear una instancia de Axios
const axiosInstance = axios.create({
    baseURL: url_base,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Configurar el interceptor de solicitudes
axiosInstance.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('token'); // Asegúrate de que sea un string
    console.log("Token enviado desde el cliente:", authToken);
    if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
});

export default axiosInstance;