import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Outlet /> {/* El contenedor donde las rutas se renderizarán */}
    </div>
  );
}

export default App;
