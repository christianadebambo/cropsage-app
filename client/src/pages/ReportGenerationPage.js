import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { getReportStatus } from '../services/api';
import ReportGenerationLoadingScreen from '../components/ReportGenerationLoadingScreen';
import styles from './ReportGenerationPage.module.css';
import useScrollFix from '../components/useScrollFix';

const ReportGenerationPage = () => {
  const location = useLocation();
  // State for storing report URL, error messages, and loading status
  const [reportUrl, setReportUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get reportId from location state
  const reportId = location.state?.reportId;

  // Custom hook to fix scroll issues
  useScrollFix();

  // Function to poll report status
  const pollReportStatus = useCallback(async () => {
    if (!reportId) return;

    const maxAttempts = 30;
    const intervalMs = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const status = await getReportStatus(reportId);
        if (status.status === 'completed') {
          setReportUrl(status.url);
          // Store report URL in session storage
          sessionStorage.setItem(`reportUrl_${reportId}`, status.url);
          setIsLoading(false);
          return;
        } else if (status.status === 'failed') {
          throw new Error('Report generation failed');
        }
      } catch (err) {
        console.error('Error polling report status:', err);
        setError('Error checking report status. Please try again.');
        setIsLoading(false);
        return;
      }
      // Wait before next poll attempt
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
    // If max attempts reached, set error
    setError('Report generation timed out. Please try again.');
    setIsLoading(false);
  }, [reportId]);

  useEffect(() => {
    // Check if we have a stored report URL
    const storedReportUrl = sessionStorage.getItem(`reportUrl_${reportId}`);
    if (storedReportUrl) {
      setReportUrl(storedReportUrl);
      setIsLoading(false);
    } else {
      pollReportStatus();
    }
  }, [reportId, pollReportStatus]);

  // Redirect to soil data page if no reportId is available
  if (!reportId) {
    return <Navigate to="/soil-data" replace />;
  }

  // Show loading screen while generating report
  if (isLoading) {
    return <ReportGenerationLoadingScreen />;
  }

  // Show error message if report generation failed
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Generated Report</h1>
      {reportUrl ? (
        <div className={styles.reportContainer}>
          {/* Display report in an iframe */}
          <iframe src={reportUrl} className={styles.reportFrame} title="Generated Report" />
          {/* Provide download link for the report */}
          <a href={reportUrl} download className={styles.downloadButton}>Download Report</a>
        </div>
      ) : (
        <p className={styles.noReport}>No report available. Please try generating the report again.</p>
      )}
    </div>
  );
};

export default ReportGenerationPage;