import React from 'react';
import { Navigate } from 'react-router-dom';
import { useVerifyToken } from '../services/system/Auth.service';

const ProtectedRoute = ({ element }) => {
  const { isValid } = useVerifyToken();

  if (isValid === null) {
    // Indicador de carga aquí
    return null;
  }

  return isValid ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
