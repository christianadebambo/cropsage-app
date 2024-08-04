import React, { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { generateReport } from '../services/api';
import ReportGenerationLoadingScreen from '../components/ReportGenerationLoadingScreen';
import styles from './CropRecommendationsPage.module.css';
import useScrollFix from '../components/useScrollFix';

const CropRecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // State to track if a report is being generated
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // Get recommendations from location state
  const recommendations = location.state?.recommendations;

  // Custom hook to fix scroll issues
  useScrollFix();

  // Redirect to soil data page if no recommendations are available
  if (!recommendations) {
    return <Navigate to="/soil-data" replace />;
  }

  // Function to handle report generation
  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    try {
      const response = await generateReport(recommendations);
      // Navigate to report generation page with recommendations and reportId
      navigate('/report-generation', { state: { recommendations, reportId: response.reportId } });
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Show loading screen while generating report
  if (isGeneratingReport) {
    return <ReportGenerationLoadingScreen />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{recommendations.title}</h1>
      <p className={styles.description}>{recommendations.description}</p>
      <div className={styles.recommendation}>
        <h2>Recommended Crop:</h2>
        <p className={styles.crop}>{recommendations.recommendation}</p>
      </div>
      <div className={styles.sustainablePractices}>
        <h2>Sustainable Agricultural Practices:</h2>
        <ul>
          {recommendations.sustainablePractices.map((practice, index) => (
            <li key={index}>{practice}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleGenerateReport} className={styles.generateReportButton}>
        Generate Report
      </button>
    </div>
  );
};

export default CropRecommendationsPage;