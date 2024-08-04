import { loginUser, logoutUser } from '../services/api';

// Variable to store the logout timer
let logoutTimer;

// Function to handle user login
export const login = async (credentials) => {
  const response = await loginUser(credentials);
  startLogoutTimer();
  return response;
};

// Function to handle user logout
export const logout = async () => {
  await logoutUser();
  clearLogoutTimer();
  window.location.href = '/login';
};

// Function to start the logout timer
export const startLogoutTimer = () => {
  clearLogoutTimer();
  logoutTimer = setTimeout(() => {
    logout();
  }, 15 * 60 * 1000); // 15 minutes
};

// Function to clear the logout timer
export const clearLogoutTimer = () => {
  if (logoutTimer) clearTimeout(logoutTimer);
};

// Function to reset the logout timer
export const resetLogoutTimer = () => {
  clearLogoutTimer();
  startLogoutTimer();
};