import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Footer.module.css';

const Footer = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer className={styles.footer}>
      <nav className={styles.footerNav}>
        <ul>
          {isLoggedIn ? (
            // Navigation items for logged-in users
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/soil-data">Soil Data</Link></li>
              <li><Link to="/historical-recommendations">Historical Recommendations</Link></li>
              <li><Link to="/analytics">Analytics</Link></li>
              <li><Link to="/resources">Resources</Link></li>
            </>
          ) : (
            // Navigation items for guests
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
          {/* Common links for all users */}
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <p className={styles.copyright}>&copy; {new Date().getFullYear()} CropSage. All rights reserved.</p>
    </footer>
  );
};

export default Footer;