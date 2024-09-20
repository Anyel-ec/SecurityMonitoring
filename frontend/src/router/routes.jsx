import { lazy } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { useState, useEffect } from 'react';

const DatabaseConnectionForm = lazy(() => import("../pages/DatabaseConnectionForm"));
const PostgresConnectionForm = lazy(() => import("../pages/PostgresConnectionForm"));

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

const routes = [
  {
    path: "/inicial",
    element: (
      <RoutesWrapper>
        <DatabaseConnectionForm />
      </RoutesWrapper>
    ),
  },

  {
    path: "/",
    element: (
      <RoutesWrapper>
        <PostgresConnectionForm />
      </RoutesWrapper>
    ),
  }
];

export { routes };
