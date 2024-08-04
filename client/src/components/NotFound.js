import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NotFound = () => {
  // Access the authentication status from the AuthContext
  const { isLoggedIn } = useAuth();

  // Redirect based on authentication status:
  // If logged in, go to dashboard; if not, go to home page
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />;
};

export default NotFound;