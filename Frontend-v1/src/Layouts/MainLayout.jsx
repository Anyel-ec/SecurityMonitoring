import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const MainLayout = ({ children, darkMode, toggleTheme }) => {
  return (
    <div>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

// Validación de las props
MainLayout.propTypes = {
  children: PropTypes.node.isRequired, // 'children' es un nodo de React (puede ser cualquier cosa que React puede renderizar) y es requerido
  darkMode: PropTypes.bool.isRequired, // Se espera que 'darkMode' sea un booleano
  toggleTheme: PropTypes.func.isRequired, // 'toggleTheme' debe ser una función
};

export default MainLayout;
