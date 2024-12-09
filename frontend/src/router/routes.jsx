import MainLayout from '../Layouts/MainLayout';
import { useState, useEffect } from 'react';
import MainComponent from '../pages/connection/MainComponent';
import PropTypes from 'prop-types';
import InstallationWizard from '../pages/installation/InstallationWizard';
import { useNavigate } from 'react-router-dom'; 
import { checkInstallationStatusService } from '../services/installationService'; // Importar el servicio
import Swal from 'sweetalert2';  // Importar SweetAlert2
import Login from '../pages/auth/login';
const RoutesWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [isInstalled, setIsInstalled] = useState(null);  // Estado de instalación, inicia en null
  const navigate = useNavigate();

  useEffect(() => {
    // Mostrar el diálogo de carga
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espera mientras verificamos el estado de la instalación',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Mostrar el spinner de carga
      }
    });

    // Verificar si el sistema está instalado usando el servicio
    const checkInstallationStatus = async () => {
      try {
        const data = await checkInstallationStatusService();  // Llamada al servicio
        setIsInstalled(data.result);  // Almacena el valor del campo "result"
        Swal.close();  // Cerrar el diálogo de carga cuando llega la respuesta

        if (!data.result && window.location.pathname !== '/instalacion') {
          // Si no está instalado y no está en la página de instalación, redirige a instalación
          navigate('/instalacion');
        } else if (data.result && window.location.pathname === '/instalacion') {
          // Si ya está instalado y trata de acceder a la página de instalación, redirige a la página principal
          navigate('/');
        }
      } catch (error) {
        console.error('Error al verificar el estado de instalación:', error);
        Swal.close();  // Cerrar el diálogo en caso de error
        Swal.fire('Error', 'Hubo un problema al verificar el estado de instalación.', 'error');
      }
    };

    checkInstallationStatus();
  }, [navigate]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Mostrar un loading o nada mientras se carga el estado de instalación
  if (isInstalled === null) {
    return null;  // Oculta la interfaz hasta que se resuelva el estado
  }

  return (
    <MainLayout darkMode={darkMode} toggleTheme={toggleTheme}>
      {children}
    </MainLayout>
  );
};

// Validación de las props con PropTypes
RoutesWrapper.propTypes = {
  children: PropTypes.node.isRequired,  // Aquí estamos diciendo que 'children' es requerido y debe ser un nodo válido
};

export default RoutesWrapper;

const routes = [
  
  {
    path: "/",
    element: (
      <RoutesWrapper>
        <MainComponent />
      </RoutesWrapper>
    ),
  }, 
  {
    path: "/instalacion",
    element: (
      <RoutesWrapper>
        <InstallationWizard />
      </RoutesWrapper>
    ),
  }, 
  {
    path: "/inicio-sesion",
    element: (
        <Login />
    ),
  },
];

export { routes };
