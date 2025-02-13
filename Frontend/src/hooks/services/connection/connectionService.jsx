import AppEnvironments from '../../../core/config/AppEnvironments';
import axiosInstance from '../../axios/axiosInstance';

export const testPostgresConnection = async (credentials) => {
  const BASE_URL = AppEnvironments.baseUrl;
  try {
    const response = await axiosInstance.post(`${BASE_URL}/api/v1/test/connectionDB`, credentials);

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Error al conectar con la base de datos.');
    }

  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Ocurrió un error desconocido');
    } else {
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
    }
  }
};
