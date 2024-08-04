import React, { useState, useEffect, useCallback } from 'react';
import { getFAQData } from '../services/api';
import styles from './FaqPage.module.css';
import useScrollFix from '../components/useScrollFix';

const FaqPage = () => {
  // State for storing FAQ data, active category, error messages, and loading status
  const [faqData, setFaqData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Custom hook to fix scroll issues
  useScrollFix();

  // Function to fetch FAQ data
  const fetchFAQData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getFAQData();
      setFaqData(data);
      if (data.length > 0) {
        setActiveCategory(data[0].name);
      }
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
      setError('Failed to load FAQ page data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchFAQData();
  }, [fetchFAQData]);

  // Show error message if data fetching failed
  if (error) return <div className={styles.error}>{error}</div>;
  
  // Show loading message while data is being fetched
  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>
      <div className={styles.faqContent}>
        {/* Category buttons */}
        <div className={styles.categoryList}>
          {faqData.map(category => (
            <button
              key={category.name}
              className={`${styles.categoryButton} ${activeCategory === category.name ? styles.active : ''}`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
        {/* Questions and answers for the active category */}
        <div className={styles.questionList}>
          {faqData.find(category => category.name === activeCategory)?.questions.map((item, index) => (
            <details key={index} className={styles.questionItem}>
              <summary className={styles.question}>{item.question}</summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;