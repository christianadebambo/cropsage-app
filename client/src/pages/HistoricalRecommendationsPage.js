import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHistoricalRecommendations, getRecommendationDetails } from '../services/api';
import styles from './HistoricalRecommendationsPage.module.css';
import useScrollFix from '../components/useScrollFix';

const HistoricalRecommendationsPage = () => {
  // State for storing page content, selected recommendation, errors, and loading status
  const [pageContent, setPageContent] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Custom hook to fix scroll issues
  useScrollFix();

  // Effect to fetch historical recommendations on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getHistoricalRecommendations();
        setPageContent(content);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching historical recommendations content:', error);
        setError('Failed to load historical recommendations. Please try again later.');
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Function to handle click on a recommendation item
  const handleRecommendationClick = async (id) => {
    try {
      const details = await getRecommendationDetails(id);
      setSelectedRecommendation(details);
      setSelectedId(id);
    } catch (error) {
      console.error('Error fetching recommendation details:', error);
      setError('Failed to load recommendation details. Please try again.');
    }
  };

  // Function to format date strings
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Africa/Lagos'
    };
    return new Date(dateString).toLocaleString('en-NG', options) + ' WAT';
  };

  // Function to get the unit for soil data properties
  const getSoilDataUnit = (key) => {
    const units = {
      N: 'kg/ha',
      P: 'kg/ha',
      K: 'kg/ha',
      temperature: '°C',
      humidity: '%',
      ph: '',
      rainfall: 'mm'
    };
    return units[key] || '';
  };

  // Show loading message while data is being fetched
  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  
  // Show error message if data fetching failed
  if (error) return <div className={styles.error}>{error}</div>;

  // Show message if no recommendations are available
  if (!pageContent.recommendations || pageContent.recommendations.length === 0) {
    return (
      <div className={styles.recommendationsContainer}>
        <h1 className={styles.title}>{pageContent.title}</h1>
        <p className={styles.description}>{pageContent.description}</p>
        <div className={styles.noRecommendations}>
          <p>You don't have any past recommendations yet.</p>
          <p>Start by getting your first crop recommendation!</p>
          <Link to="/soil-data" className={styles.ctaButton}>
            Get Crop Recommendation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.recommendationsContainer}>
      <h1 className={styles.title}>{pageContent.title}</h1>
      <p className={styles.description}>{pageContent.description}</p>
      <div className={styles.recommendationsLayout}>
        {/* List of recommendations */}
        <div className={styles.recommendationsList}>
          {pageContent.recommendations.map((rec) => (
            <div
              key={rec._id}
              className={`${styles.recommendationItem} ${rec._id === selectedId ? styles.selected : ''}`}
              onClick={() => handleRecommendationClick(rec._id)}
            >
              <h3>{rec.recommendedCrop}</h3>
              <p>{formatDate(rec.createdAt)}</p>
            </div>
          ))}
        </div>
        {/* Details of selected recommendation */}
        <div className={styles.recommendationDetails}>
          {selectedRecommendation ? (
            <>
              <h2 className={styles.detailsTitle}>Recommendation Details</h2>
              <div className={styles.detailsSection}>
                <h3 className={styles.sectionTitle}>Recommended Crop</h3>
                <p className={styles.cropName}>{selectedRecommendation.recommendedCrop}</p>
              </div>
              <div className={styles.detailsSection}>
                <h3 className={styles.sectionTitle}>Soil Data</h3>
                <ul className={styles.soilDataList}>
                  {Object.entries(selectedRecommendation.soilData).map(([key, value]) => (
                    <li key={key}>
                      <span className={styles.soilDataKey}>{key}:</span> {value}
                      {getSoilDataUnit(key) && <span className={styles.soilDataUnit}> {getSoilDataUnit(key)}</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.detailsSection}>
                <h3 className={styles.sectionTitle}>Sustainable Agricultural Practices</h3>
                <ul className={styles.practicesList}>
                  {selectedRecommendation.sustainablePractices.map((practice, index) => (
                    <li key={index}>{practice}</li>
                  ))}
                </ul>
              </div>
              <p className={styles.generatedDate}>Generated on: {formatDate(selectedRecommendation.createdAt)}</p>
            </>
          ) : (
            <p className={styles.noSelection}>Select a recommendation to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricalRecommendationsPage;