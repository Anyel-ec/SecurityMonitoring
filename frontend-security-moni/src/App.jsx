import React, { useState, useEffect } from 'react';
import Header from './components/Layouts/Header'; // Asegúrate de tener la ruta correcta
import './App.css'; // Para los estilos globales de tema oscuro y claro

export default function App() {
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
    <div className="app-container">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="content">
        {/* Resto del contenido de tu aplicación */}
      </div>
    </div>
  );
}
