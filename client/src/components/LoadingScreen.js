import React from 'react';
import styles from './LoadingScreen.module.css';
import logo from '../assets/cropsage-logo.png';

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.content}>
        {/* Display the CropSage logo */}
        <img src={logo} alt="CropSage Logo" className={styles.logo} />
        
        {/* Application title */}
        <h1 className={styles.title}>CropSage</h1>
        
        {/* Spinning loader animation */}
        <div className={styles.spinner}></div>
        
        {/* Loading message */}
        <p className={styles.message}>Preparing your farming insights...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;