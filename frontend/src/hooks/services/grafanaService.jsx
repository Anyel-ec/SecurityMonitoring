// services/GrafanaService.js
import axios from 'axios';
import AppEnvironments from '../../core/config/AppEnvironments';

const BASE_URL = `${AppEnvironments.baseUrl}/api/v1/grafana`;

/**
 * Inicia sesión en Grafana.
 * @returns {Promise} Promesa que devuelve la respuesta del inicio de sesión en Grafana.
 */
export const loginToGrafana = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/grafana-login`);
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión en Grafana:', error);
    throw error;
  }
};

/**
 * Accede al dashboard de Grafana con una sesión activa.
 * @returns {Promise} Promesa que devuelve la respuesta de la solicitud.
 */
export const accessDashboardWithSession = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/access-dashboard-with-session`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error al acceder al dashboard de Grafana:', error);
    throw error;
  }
};

/**
 * Realiza el inicio de sesión en Grafana y, si es exitoso, accede al dashboard.
 * 
 * @param {string} dbType - Tipo de base de datos (por ejemplo, 'postgres', 'mariadb', 'mongodb').
 * @returns {Promise} Promesa que devuelve la respuesta del proceso de acceso al dashboard.
 */
export const loginAndAccessDashboard = async (dbType) => {
  try {
    const response = await axios.get(`${BASE_URL}/grafana-login-and-access-dashboard`, {
      params: { dbType: dbType.toLowerCase() },
      withCredentials: true,
    });
    console.log('Respuesta de loginAndAccessDashboard:', response.data);
    if (response.data.success && response.data.result?.redirectUrl) {
      return response.data.result; // Retornar el resultado con la URL
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error al iniciar sesión y acceder al dashboard de Grafana:', error);
    throw error;
  }
};


/**
 * Crea un nuevo dashboard en Grafana.
 * @returns {Promise} Promesa que devuelve la respuesta de la creación del dashboard.
 */
export const createDashboard = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/dashboard/create`);
    return response.data;
  } catch (error) {
    console.error('Error al crear el dashboard en Grafana:', error);
    throw error;
  }
};

/**
 * Crea una datasource de Prometheus en Grafana.
 * @returns {Promise} Promesa que devuelve la respuesta de la creación de la datasource.
 */
export const createPrometheusDatasource = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/datasource`);
    return response.data;
  } catch (error) {
    console.error('Error al crear la datasource de Prometheus en Grafana:', error);
    throw error;
  }
};

