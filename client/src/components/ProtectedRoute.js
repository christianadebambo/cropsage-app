import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, verifyAuth, isLoading } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      await verifyAuth();
      setIsVerifying(false);
    };
    checkAuth();
  }, [verifyAuth]);

  if (isVerifying || isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;