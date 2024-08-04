import React, { useState, useEffect } from 'react';
import styles from './ReportGenerationLoadingScreen.module.css';
import logo from '../assets/cropsage-logo.png';

// Array of loading messages to display during report generation
const messages = [
  "Preparing report data...",
  "Generating PDF...",
  "Finalizing report..."
];

const ReportGenerationLoadingScreen = () => {
  // State to keep track of the current message index
  const [currentMessage, setCurrentMessage] = useState(0);

  // Effect to rotate through messages every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.content}>
        {/* Display the CropSage logo */}
        <img src={logo} alt="CropSage Logo" className={styles.logo} />
        
        {/* Application title */}
        <h1 className={styles.title}>CropSage</h1>
        
        {/* Spinning loader animation */}
        <div className={styles.spinner}></div>
        
        {/* Display current loading message */}
        <p className={styles.message}>{messages[currentMessage]}</p>
      </div>
    </div>
  );
};

export default ReportGenerationLoadingScreen;