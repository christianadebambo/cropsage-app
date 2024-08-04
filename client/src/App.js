import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import UserActivity from './components/UserActivity';
import LoadingScreen from './components/LoadingScreen';
import HomeRedirect from './components/HomeRedirect';
import NotFound from './components/NotFound';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FarmerDashboard from './pages/FarmerDashboard';
import SoilDataPage from './pages/SoilDataPage';
import CropRecommendationsPage from './pages/CropRecommendationsPage';
import ReportGenerationPage from './pages/ReportGenerationPage';
import HistoricalRecommendationsPage from './pages/HistoricalRecommendationsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ResourcesPage from './pages/ResourcesPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// AppContent component to handle routing and layout
const AppContent = () => {
  const { isLoading } = useAuth();

  // Show loading screen while auth status is being checked
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App">
        <UserActivity />
        <Header />
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><FarmerDashboard /></ProtectedRoute>} />
            <Route path="/soil-data" element={<ProtectedRoute><SoilDataPage /></ProtectedRoute>} />
            <Route path="/crop-recommendations" element={<ProtectedRoute><CropRecommendationsPage /></ProtectedRoute>} />
            <Route path="/report-generation" element={<ProtectedRoute><ReportGenerationPage /></ProtectedRoute>} />
            <Route path="/historical-recommendations" element={<ProtectedRoute><HistoricalRecommendationsPage /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Main App component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;