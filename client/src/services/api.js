import axios from 'axios';

// Set the base URL for API calls
const API_URL = process.env.REACT_APP_API_URL || '/api';

// Enable sending cookies with cross-origin requests
axios.defaults.withCredentials = true;

// Home Page
export const getHomeData = async () => {
  try {
    const response = await axios.get(`${API_URL}/home`);
    return response.data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};

// FAQ Page
export const getFAQData = async () => {
  try {
    const response = await axios.get(`${API_URL}/faq`);
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQ data:', error);
    throw error;
  }
};

export const getFAQCategory = async (categoryName) => {
  try {
    const response = await axios.get(`${API_URL}/faq/category/${categoryName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQ category:', error);
    throw error;
  }
};

// Contact Page
export const getContactPageContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/contact/content`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contact page content:', error);
    throw error;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/contact/submit`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Authentication
export const getRegistrationContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/registration-content`);
    return response.data;
  } catch (error) {
    console.error('Error fetching registration content:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getLoginContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/login-content`);
    return response.data;
  } catch (error) {
    console.error('Error fetching login content:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axios.get(`${API_URL}/auth/logout`);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/status`);
    return { isAuthenticated: true, user: response.data.user };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { isAuthenticated: false, user: null };
    }
    console.error('Error checking auth status:', error);
    throw error;
  }
};

// Dashboard
export const getFarmerDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching farmer dashboard data:', error);
    throw error;
  }
};

// Soil Data
export const getSoilDataContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/soil-data`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching soil data content:', error);
    throw error;
  }
};

export const submitSoilData = async (soilData) => {
  try {
    const response = await axios.post(`${API_URL}/soil-data/submit`, soilData);
    return response.data;
  } catch (error) {
    console.error('Error submitting soil data:', error);
    throw error;
  }
};

// Crop Recommendations
export const getCropRecommendations = async (soilData) => {
  try {
    const response = await axios.post(`${API_URL}/crop-recommendations`, soilData);
    return response.data;
  } catch (error) {
    console.error('Error fetching crop recommendations:', error);
    throw error;
  }
};

// Historical Recommendations
export const getHistoricalRecommendations = async () => {
  try {
    const response = await axios.get(`${API_URL}/historical-recommendations`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching historical recommendations:', error);
    throw error;
  }
};

export const getRecommendationDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/historical-recommendations/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recommendation details:', error);
    throw error;
  }
};

// Analytics
export const getAnalyticsContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching analytics content:', error);
    throw error;
  }
};

// Resources
export const getResourcesContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/resources`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching resources content:', error);
    throw error;
  }
};

// Report Generation
export const generateReport = async (recommendations) => {
  try {
    const response = await axios.post(`${API_URL}/report/generate`, recommendations);
    return response.data;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

export const getReportStatus = async (reportId) => {
  try {
    const response = await axios.get(`${API_URL}/report/status/${reportId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting report status:', error);
    throw error;
  }
};