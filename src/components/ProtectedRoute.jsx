import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  try {
    const userString = sessionStorage.getItem('user');

    if (!userString) {
      return <Navigate to="/" replace />;
    }

    const user = JSON.parse(userString);

    if (!user || typeof user !== 'object') {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error('ProtectedRoute error:', err);
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;