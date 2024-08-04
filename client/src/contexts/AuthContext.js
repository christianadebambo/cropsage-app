import React, { createContext, useState, useContext } from 'react';
import { checkAuthStatus } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const verifyAuth = async () => {
    if (isLoggedIn) return true; // If already logged in, no need to check again
    setIsLoading(true);
    try {
      const { isAuthenticated } = await checkAuthStatus();
      setIsLoggedIn(isAuthenticated);
      setIsLoading(false);
      return isAuthenticated;
    } catch (error) {
      console.error('Error verifying auth status:', error);
      setIsLoggedIn(false);
      setIsLoading(false);
      return false;
    }
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);