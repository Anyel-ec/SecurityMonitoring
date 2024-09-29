import MainLayout from '../Layouts/MainLayout';
import { useState, useEffect } from 'react';
import MainComponent from '../pages/MainComponent';
import PropTypes from 'prop-types';
import InstallationWizard from '../pages/installation/InstallationWizard';


const RoutesWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

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
  }
  
];

export { routes };
