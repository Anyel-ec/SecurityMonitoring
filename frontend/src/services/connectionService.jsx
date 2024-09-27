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

// Servicio para guardar o actualizar una conexión
export const saveOrUpdateConnection = async (connection) => {
  const BASE_URL = AppEnvironments.baseUrl; // Usamos la clase para obtener la URL base
  try {
    console.log('Datos que se envían:', connection); // Agregar log para ver qué se está enviando
    const response = await axios.post(`${BASE_URL}/api/v1/connection/save`, connection); // Usamos la URL completa del backend
    return response.data;
  } catch (error) {
    console.error('Error al guardar o actualizar la conexión:', error);
    throw error;
  }
};


// Servicio para eliminar una conexión por ID
export const deleteConnectionById = async (id) => {
  const BASE_URL = AppEnvironments.baseUrl; // Usamos la clase para obtener la URL base
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/connection/delete/${id}`); // Usamos DELETE con el ID
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la conexión:', error);
    throw error;
  }
};