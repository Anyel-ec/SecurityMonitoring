import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

// Servicio para obtener los nombres de las conexiones
export const getConnectionNames = async () => {
  const BASE_URL = AppEnvironments.baseUrl; // Usamos la clase para obtener la URL base
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/connection/names`); // Usamos la URL completa del backend
    return response.data;
  } catch (error) {
    console.error('Error al obtener los nombres de las conexiones:', error);
    throw error;
  }
};
