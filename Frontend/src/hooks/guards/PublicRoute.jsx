import React from 'react';
import { Navigate } from 'react-router-dom';
import { useVerifyToken } from '../services/system/Auth.service';

const PublicRoute = ({ element }) => {
  const { isValid } = useVerifyToken();

  if (isValid === null) {
    // Indicador de carga aquí
    return null;
  }

  return isValid ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;