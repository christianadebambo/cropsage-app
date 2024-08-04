import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HomePage from '../pages/HomePage';

const HomeRedirect = () => {
  // Access the authentication status from the AuthContext
  const { isLoggedIn } = useAuth();

  // If the user is logged in, redirect to the dashboard
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is not logged in, render the HomePage
  return <HomePage />;
};

export default HomeRedirect;