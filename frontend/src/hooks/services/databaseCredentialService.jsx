import axios from 'axios';
import AppEnvironments from '../../core/config/AppEnvironments';

const BASE_URL = `${AppEnvironments.baseUrl}/api/v1/credentials`;

export const createOrUpdateCredential = async (dto) => {
  try {
    const response = await axios.post(`${BASE_URL}/createOrUpdate`, dto);
    return response.data;
  } catch (error) {
    console.error('Error al crear o actualizar la credencial:', error);
    throw error;
  }
};


// Servicio para obtener todas las credenciales de base de datos
export const getAllCredentials = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    console.log("CREDENCIALES OBTENEDIAS: ", response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todas las credenciales:', error);
    throw error;
  }
};

export const deleteConnectionById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la conexión:', error);
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