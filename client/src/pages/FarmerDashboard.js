import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFarmerDashboardData } from '../services/api';
import styles from './FarmerDashboard.module.css';
import useScrollFix from '../components/useScrollFix';

const FarmerDashboard = () => {
  // State for storing dashboard data and error messages
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Custom hook to fix scroll issues
  useScrollFix();

  // Effect to fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getFarmerDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (error.response && error.response.status === 401) {
          // Redirect to login if unauthorized
          navigate('/login');
        } else {
          setError('Failed to load dashboard data. Please try again later.');
        }
      }
    };
    fetchDashboardData();
  }, [navigate]);

  // Show error message if data fetching failed
  if (error) return <div className={styles.error}>{error}</div>;
  
  // Show loading message while data is being fetched
  if (!dashboardData) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.welcomeMessage}>Welcome, {dashboardData.farmerName}!</h1>
      
      {/* Farm information section */}
      <div className={styles.farmInfo}>
        <h2>Farm Details</h2>
        <p><strong>Farm Name:</strong> {dashboardData.farmName}</p>
        <p><strong>Location:</strong> {dashboardData.location}</p>
      </div>
      
      {/* Quick links section */}
      <div className={styles.quickLinks}>
        <h2>Quick Links</h2>
        <div className={styles.linkGrid}>
          {/* Soil Data Input link */}
          <Link to="/soil-data" className={styles.quickLink}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span>Soil Data Input</span>
          </Link>
          
          {/* Historical Recommendations link */}
          <Link to="/historical-recommendations" className={styles.quickLink}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span>Historical Recommendations</span>
          </Link>
          
          {/* Analytics Dashboard link */}
          <Link to="/analytics" className={styles.quickLink}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            <span>Analytics Dashboard</span>
          </Link>
          
          {/* Educational Resources link */}
          <Link to="/resources" className={styles.quickLink}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
            </svg>
            <span>Educational Resources</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;