import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser } from '../services/api';
import styles from './Header.module.css';
import logo from '../assets/cropsage-logo.png';

const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
    document.body.style.overflow = isNavVisible ? 'auto' : 'hidden';
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className={styles.header}>
      <Link to={isLoggedIn ? "/dashboard" : "/"} className={styles.logoContainer}>
        <img src={logo} alt="CropSage Logo" className={styles.logo} />
        <span className={styles.logoText}>CropSage</span>
      </Link>
      <button
        className={`${styles.navToggle} ${isNavVisible ? styles.active : ''}`}
        onClick={toggleNav}
        aria-label="Toggle navigation"
      >
        <span className={styles.hamburger}></span>
      </button>
      <nav className={`${styles.nav} ${isNavVisible ? styles.navVisible : ''}`}>
        <ul className={styles.navList}>
          {isLoggedIn ? (
            <>
              <li><Link to="/dashboard" onClick={toggleNav}>Dashboard</Link></li>
              <li><Link to="/soil-data" onClick={toggleNav}>Soil Data</Link></li>
              <li><Link to="/historical-recommendations" onClick={toggleNav}>Historical Recommendations</Link></li>
              <li><Link to="/analytics" onClick={toggleNav}>Analytics</Link></li>
              <li><Link to="/resources" onClick={toggleNav}>Resources</Link></li>
              <li><button onClick={handleLogout} className={styles.logoutButton}>Log Out</button></li>
            </>
          ) : (
            <>
              <li><Link to="/" onClick={toggleNav}>Home</Link></li>
              <li><Link to="/login" onClick={toggleNav}>Log In</Link></li>
              <li><Link to="/register" onClick={toggleNav}>Register</Link></li>
              <li><Link to="/faq" onClick={toggleNav}>FAQ</Link></li>
              <li><Link to="/contact" onClick={toggleNav}>Contact</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;