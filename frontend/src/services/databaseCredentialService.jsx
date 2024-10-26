import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const BASE_URL = `${AppEnvironments.baseUrl}/api/v1/credentials`;

// Servicio para crear una credencial de base de datos
export const createCredential = async (dto) => {
  try {
    const response = await axios.post(`${BASE_URL}`, dto);
    return response.data;
  } catch (error) {
    console.error('Error al crear la credencial:', error);
    throw error;
  }
};


// Servicio para obtener todas las credenciales de base de datos
export const getAllCredentials = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todas las credenciales:', error);
    throw error;
  }
};

// Servicio para obtener una credencial de base de datos por ID
export const getCredentialById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la credencial por ID:', error);
    throw error;
  }
};

// Servicio para eliminar una credencial de base de datos
export const deleteCredential = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la credencial:', error);
    throw error;
  }
};
