import {
  showLoadingAlert,
  showSuccessAlert,
  showErrorAlert,
  showWarningAlert,
  closeAlert,
} from '../../../components/alerts/alerts';
import { completeInstallService } from '../../../hooks/services/installing/installationService';
import { checkContainerStatusService } from '../../../hooks/services/dockerService';

// Completar la instalación y ejecutar Docker Compose
export const completeInstallation = async (navigate) => {
  try {
    await completeInstallService();

    showSuccessAlert('Instalación Completa', 'Docker Compose se ejecutó y la instalación se ha completado exitosamente.');
    navigate('/');
  } catch (error) {
    closeAlert();
    showErrorAlert('Error', error.message || 'Hubo un problema al completar la instalación o ejecutar Docker Compose.');
  }
};

// Function to check if containers are up
export const checkContainerStatus = async (setCurrentStep) => {
  showLoadingAlert('Instalando...', 'Por favor, espera mientras verificamos el estado de los contenedores.');

  try {
    const response = await checkContainerStatusService();
    closeAlert();

    if (response.success) {
      showSuccessAlert('Contenedores en funcionamiento', 'Tanto Grafana como Prometheus están ejecutándose.');
      setCurrentStep((prev) => prev + 1); // Avanza al siguiente paso (paso final)
    } else {
      showWarningAlert('Contenedores no listos', 'Uno o ambos contenedores no están en funcionamiento. Por favor, inténtalo nuevamente.');
    }
  } catch (error) {
    closeAlert();
    showErrorAlert('Error', error.message || 'Hubo un problema al verificar el estado de los contenedores.');
  }
};