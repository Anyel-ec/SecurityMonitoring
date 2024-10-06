import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';
import { createGrafanaInstallDto } from '../dto/GrafanaInstallDto';
import { createPrometheusInstallDto } from '../dto/PrometheusInstallDto';
import { createInstallationConfig } from '../models/InstallationConfig';

// Servicio para verificar el estado de la instalación
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

// Servicio para obtener la instalación de Grafana
export const getGrafanaInstallService = async () => {
  const BASE_URL = AppEnvironments.baseUrl;
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/install/grafana`);
    return createInstallationConfig(
      response.data.id,
      response.data.internalPort,
      response.data.externalPort,
      response.data.usuario,
      response.data.password,
      response.data.numberPhone,
      response.data.email,
      response.data.systemParameter,
      response.data.createdAt,
      response.data.isActive
    );
  } catch (error) {
    console.error('Error al obtener la instalación de Grafana:', error);
    throw error;
  }
};

// Servicio para guardar la instalación de Grafana usando el DTO
export const saveGrafanaInstallService = async (grafanaInstallData) => {
  const BASE_URL = AppEnvironments.baseUrl;
  const grafanaDto = createGrafanaInstallDto(
    grafanaInstallData.usuario,
    grafanaInstallData.password,
    grafanaInstallData.internalPort,
    grafanaInstallData.externalPort
  );

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/install/grafana`, grafanaDto);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Error al guardar la instalación de Grafana');
    } else {
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
    }
  }
};

// Servicio para obtener la instalación de Prometheus
export const getPrometheusInstallService = async () => {
  const BASE_URL = AppEnvironments.baseUrl;
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/install/prometheus`);
    return createInstallationConfig(
      response.data.id,
      response.data.internalPort,
      response.data.externalPort,
      response.data.usuario,
      response.data.password,
      response.data.numberPhone,
      response.data.email,
      response.data.systemParameter,
      response.data.createdAt,
      response.data.isActive
    );
  } catch (error) {
    console.error('Error al obtener la instalación de Prometheus:', error);
    throw error;
  }
};

// Servicio para guardar la instalación de Prometheus usando el DTO
export const savePrometheusInstallService = async (prometheusInstallData) => {
  const BASE_URL = AppEnvironments.baseUrl;
  const prometheusDto = createPrometheusInstallDto(
    prometheusInstallData.internalPort,
    prometheusInstallData.externalPort
  );

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/install/prometheus`, prometheusDto);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Error al guardar la instalación de Prometheus');
    } else {
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
    }
  }
};


// Servicio para obtener las instalaciones activas
export const getActiveInstallationsService = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/install/active`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las instalaciones activas:', error);
    throw error;
  }
};
