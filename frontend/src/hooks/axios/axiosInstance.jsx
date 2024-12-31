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
axiosInstance.interceptors.request.use(
    (config) => {
        // Obtener el token del localStorage
        const authToken = localStorage.getItem('token');
        if (authToken) {
            // Si el token existe, añadirlo a las cabeceras de la solicitud
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// // Extender AxiosRequestConfig para incluir customBaseURL
// declare module 'axios' {
//     export interface InternalAxiosRequestConfig {
//         customBaseURL?: string; // Propiedad personalizada para cambiar la URL
//     }
// }

export default axiosInstance;