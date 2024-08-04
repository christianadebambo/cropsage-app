import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getHomeData } from '../services/api';
import styles from './HomePage.module.css';
import useScrollFix from '../components/useScrollFix';

const HomePage = () => {
  // State for storing home page data, error messages, and loading status
  const [homeData, setHomeData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Custom hook to fix scroll issues
  useScrollFix();

  // Function to fetch home page data
  const fetchHomeData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getHomeData();
      setHomeData(data);
    } catch (error) {
      console.error('Error fetching home data:', error);
      setError('Failed to load Home page data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  // Show error message if data fetching failed
  if (error) return <div className={styles.error}>{error}</div>;
  
  // Show loading message while data is being fetched
  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>{homeData.title}</h1>
      <p className={styles.mission}>{homeData.mission}</p>
      
      {/* Benefits section */}
      <section className={styles.benefits}>
        <h2>Benefits</h2>
        <ul>
          {homeData.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </section>
      
      {/* Quick links section */}
      <section className={styles.quickLinks}>
        <h2>Quick Links</h2>
        <div className={styles.linkGrid}>
          {homeData.quickLinks.map((link, index) => (
            <Link key={index} to={link.path} className={styles.linkCard}>
              {link.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;