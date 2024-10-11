import Swal from 'sweetalert2';
import { completeInstallService } from '../../../services/installationService'; 
import { runDockerInstallService } from '../../../services/dockerComposeService'; 
import { useNavigate } from 'react-router-dom'; 

// Completar la instalación y ejecutar Docker Compose
export const completeInstallation = async (navigate) => {
  try {
    // Completa la instalación
    await completeInstallService();

    // Ejecuta Docker Compose
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando Docker...',
      text: 'Por favor, espera mientras se ejecuta Docker Compose.',
      showConfirmButton: false,
      allowOutsideClick: false, // No permitir cerrar la alerta mientras se ejecuta Docker
      willOpen: () => {
        Swal.showLoading(); // Muestra el spinner de carga
      },
    });

    // Llama al servicio que ejecuta Docker
    await runDockerInstallService();

    // Cerrar la alerta de carga y mostrar mensaje de éxito
    Swal.close();

    Swal.fire({
      icon: 'success',
      title: 'Instalación Completa',
      text: 'Docker Compose se ejecutó y la instalación se ha completado exitosamente.',
      toast: true,
      position: 'bottom-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    // Redirige a la raíz solo si Docker Compose fue exitoso
    navigate('/');
    
  } catch (error) {
    // Cierra la alerta de carga si hay un error
    Swal.close();

    // Mostrar una alerta de error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'Hubo un problema al completar la instalación o ejecutar Docker Compose.',
      toast: true,
      position: 'bottom-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
};
