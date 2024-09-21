import React, { useState, useEffect } from 'react';
import Header from './components/Layouts/Header';
import MainComponent from './components/MainComponent'; 
import './App.css'; 

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme'); // Asegúrate de agregar la clase dark-theme al body
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="content">
        <MainComponent darkMode={darkMode} /> {/* Pasar darkMode como prop */}
      </div>
    </div>
  );
}
