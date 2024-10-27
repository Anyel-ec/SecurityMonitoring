// src/utils/alerts.js
import Swal from 'sweetalert2';

export const showSuccessAlert = (title, message) => {
  Swal.fire({
    toast: true,
    position: 'top-right',
    icon: 'success',
    title: title,
    text: message,
    showConfirmButton: false,
    timer: 3000,
  });
};

export const showErrorAlert = (title, message) => {
  Swal.fire({
    toast: true,
    position: 'top-right',
    icon: 'error',
    title: title,
    text: message,
    showConfirmButton: false,
    timer: 3000,
  });
};

export const showConfirmationAlert = async (title, text) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });
  return result;
};

// Nueva alerta para el estado de Docker
export const showDockerErrorAlert = (retryCallback) => {
  Swal.fire({
    title: 'Error',
    text: 'Docker no está en ejecución. No se puede continuar.',
    icon: 'error',
    confirmButtonText: 'Aceptar',
  }).then((result) => {
    if (result.isConfirmed) {
      retryCallback(); // Ejecuta el callback para reintentar la verificación de Docker
    }
  });
};