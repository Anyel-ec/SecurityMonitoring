import React from 'react';
import axios from 'axios';
import AppEnvironments from '../../core/config/AppEnvironments'; // Importar la configuración de entornos

const GrafanaDashboardPage = () => {

  // Función para redirigir al dashboard de Grafana
  const goToDashboard = async () => {
    console.log("Botón clicado. Ejecutando goToDashboard..."); // Log para verificar si el botón ha sido clicado

    const BASE_URL = AppEnvironments.baseUrl; // Leer la base URL del archivo de configuración
    console.log(`Base URL obtenida: ${BASE_URL}`); // Log para verificar la base URL

    try {
      console.log("Realizando petición al backend..."); // Log antes de realizar la petición
      const response = await axios.get(`${BASE_URL}/api/grafana/dashboard`);  // Usar la base URL para hacer la petición
      console.log("Respuesta recibida del backend:", response); // Log para verificar la respuesta recibida

      if (response.status === 200) {
        const grafanaDashboardUrl = response.data;  // La URL del dashboard obtenida desde el backend
        console.log("Redirigiendo a la URL del dashboard de Grafana:", grafanaDashboardUrl); // Log para verificar la redirección
        window.location.href = grafanaDashboardUrl;  // Redirigir al dashboard
      } else {
        console.error('Error accediendo al dashboard de Grafana:', response.status, response.statusText); // Log del error si la respuesta no es exitosa
      }
    } catch (error) {
      console.error('Error accediendo al dashboard de Grafana:', error); // Log para errores de la petición
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Acceder al Dashboard de Grafana</h1>
      <p>Haz clic en el botón de abajo para ser redirigido al dashboard de Grafana.</p>
      <button onClick={() => {
        console.log("Botón clicado!"); // Log para confirmar que se ha hecho clic en el botón
        goToDashboard();
      }}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Ir al Dashboard
      </button>
    </div>
  );
};

export default GrafanaDashboardPage;
