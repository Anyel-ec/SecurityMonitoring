// services/GrafanaService.js
import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

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
 * @returns {Promise} Promesa que devuelve la respuesta del proceso de acceso al dashboard.
 */
export const loginAndAccessDashboard = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/grafana-login-and-access-dashboard`, {
      withCredentials: true,
    });
    return response.data; // Devuelve la respuesta completa
  } catch (error) {
    console.error('Error al iniciar sesión y acceder al dashboard de Grafana:', error);
    throw error;
  }
};