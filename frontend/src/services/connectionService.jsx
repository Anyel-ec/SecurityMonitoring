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
// Servicio para guardar o actualizar la conexión
export const saveOrUpdateConnectionName = async (connectionData) => {
  const BASE_URL = AppEnvironments.baseUrl;
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/connection/save`, connectionData);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Ocurrió un error desconocido');
    } else {
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
    }
  }

};

// Servicio para guardar o actualizar la conexión
export const saveOrUpdateConnectionCredentials = async (connectionData) => {
  const BASE_URL = AppEnvironments.baseUrl;
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/config/database`, connectionData);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      // Devolver el mensaje de error del servidor
      throw new Error(error.response.data.message || 'Ocurrió un error desconocido');
    } else {
      // Si no hay respuesta del servidor, arrojar un error general
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
    }
  }
};



// Servicio para eliminar una conexión por ID
export const deleteConnectionById = async (id) => {
  const BASE_URL = AppEnvironments.baseUrl; // Usamos la clase para obtener la URL base
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/connection/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la conexión:', error);
    throw error;
  }
};


export const testPostgresConnection = async (credentials) => {
  const BASE_URL = AppEnvironments.baseUrl;
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/config/testConnection/postgresql`, credentials);

    // Verifica si la respuesta fue exitosa
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Error al conectar con la base de datos.');
    }

  } catch (error) {
    if (error.response?.data) {
      // Devolver el mensaje de error del servidor
      throw new Error(error.response.data.message || 'Ocurrió un error desconocido');
    } else {
      // Si no hay respuesta del servidor, arrojar un error general
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
    }
  }
};




