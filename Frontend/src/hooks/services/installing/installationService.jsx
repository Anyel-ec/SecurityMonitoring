import axios from 'axios';
import AppEnvironments from '../../../core/config/AppEnvironments';
import { createGrafanaInstallDto } from '../../../core/dto/GrafanaInstallDto';
import { createPrometheusInstallDto } from '../../../core/dto/PrometheusInstallDto';
import { createInstallationConfig } from '../../../core/models/InstallationConfig';
import { createUserInstallRequestDto } from '../../../core/dto/UserInstallRequestDto';

export const saveOrUpdatePrometheusExportersService = async (exporterData) => {
    const BASE_URL = AppEnvironments.baseUrl;
    try {
        console.log('Enviando datos para la actualización de exportadores de Prometheus...');
        const response = await axios.put(`${BASE_URL}/api/v1/install/prometheus-exporters`, exporterData);
        console.log('Respuesta recibida:', response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Capturar error 422 y manejar múltiples errores
            if (error.response.status === 422 && error.response.data.result) {
                const errorMessages = error.response.data.result
                    .map(err => `${err.message} (Puerto: ${err.rejectedValue})`)
                    .join('\n');

                throw new Error(`Errores de validación encontrados:\n${errorMessages}`);
            }
            throw new Error(error.response.data.message || 'Error al actualizar los exportadores de Prometheus');
        } else {
            throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
        }
    }
};

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

export const saveGrafanaInstallService = async (grafanaInstallData) => {
    const BASE_URL = AppEnvironments.baseUrl;
    const grafanaDto = createGrafanaInstallDto(
        grafanaInstallData.usuario,
        grafanaInstallData.password,
        grafanaInstallData.internalPort,
        grafanaInstallData.externalPort
    );

    console.log('grafanaDto:', grafanaDto);

    try {
        console.log('Enviando datos al servidor...');
        const response = await axios.post(`${BASE_URL}/api/v1/install/grafana`, grafanaDto);
        console.log('response:', response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Capturar error 422 con el puerto rechazado
            if (error.response.status === 422 && error.response.data.result) {
                const errorMessages = error.response.data.result
                    .map(err => `${err.message} (Puerto: ${err.rejectedValue})\n `)
                    .join('\n');
                throw new Error(errorMessages);
            }
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
        prometheusInstallData.externalPort,
        prometheusInstallData.internalPortAlertmanager,
        prometheusInstallData.externalPortAlertmanager
    );

    try {
        console.log('Enviando datos al servidor para la instalación de Prometheus y Alertmanager...');
        const response = await axios.post(`${BASE_URL}/api/v1/install/prometheus`, prometheusDto);
        console.log('Respuesta recibida:', response);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Capturar error 422 con mensaje y puerto rechazado
            if (error.response.status === 422 && error.response.data.result) {
                const errorMessages = error.response.data.result
                    .map(err => `${err.message} (Puerto: ${err.rejectedValue})`)
                    .join(", ");
                    throw new Error(errorMessages);
            }
            throw new Error(error.response.data.message || 'Error al guardar la instalación de Prometheus y Alertmanager');
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


// Servicio para completar la instalación
export const completeInstallService = async () => {
  const BASE_URL = AppEnvironments.baseUrl;

  try {
    const response = await axios.put(`${BASE_URL}/api/v1/install/complete`);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Error al completar la instalación');
    } else {
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
    }
  }
};




// Service to save the user installation
export const saveUserInstallService = async (userInstallData) => {
  const BASE_URL = AppEnvironments.baseUrl;

  // Create the User Install DTO
  const userInstallDto = createUserInstallRequestDto(
    userInstallData.usuario,
    userInstallData.password,
    userInstallData.passwordConfirm,
    userInstallData.numberPhone,
    userInstallData.email,
    userInstallData.name,
    userInstallData.lastname,
    userInstallData.company
);

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/install/user`, userInstallDto);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Error al guardar el registro de usuario');
    } else {
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión.');
    }
  }
};
