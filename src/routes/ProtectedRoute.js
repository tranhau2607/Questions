import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const role = localStorage.getItem('role');
  
  return role ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
