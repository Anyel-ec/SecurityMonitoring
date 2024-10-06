import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';


export const checkInstallationStatusService = async () => {
    const BASE_URL = AppEnvironments.baseUrl; 
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/install/status`);
      return response.data;
    } catch (error) {
      console.error('Error al verificar el estado de instalación:', error);
      throw error;
    }
  };