import React from 'react';
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

export default MainLayout;
