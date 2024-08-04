import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSoilDataContent, submitSoilData, getCropRecommendations } from '../services/api';
import RecommendationLoadingScreen from '../components/RecommendationLoadingScreen';
import styles from './SoilDataPage.module.css';
import useScrollFix from '../components/useScrollFix';

const SoilDataPage = () => {
  // State for storing page content, form data, errors, and UI states
  const [pageContent, setPageContent] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Labels for form fields
  const fieldLabels = {
    N: 'Soil Nitrogen (kg/ha)',
    P: 'Soil Phosphorus (kg/ha)',
    K: 'Soil Potassium (kg/ha)',
    temperature: 'Soil Temperature (°C)',
    humidity: 'Relative Humidity (%)',
    ph: 'Soil pH (0 - 14)',
    rainfall: 'Rainfall (mm)'
  };

  // Custom hook to fix scroll issues
  useScrollFix();

  // Effect to fetch soil data content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getSoilDataContent();
        setPageContent(content);
      } catch (error) {
        console.error('Error fetching soil data content:', error);
        setError('Failed to load soil data content. Please try again later.');
      }
    };
    fetchContent();
  }, []);

  // Function to validate individual form fields
  const validateField = (name, value) => {
    if (!value.trim()) {
      return 'This field is required';
    }
    const numericRegex = /^[0-9]*\.?[0-9]*$/;
    if (!numericRegex.test(value)) {
      return 'Please enter a valid number';
    }
    const numValue = parseFloat(value);
    if (name === 'ph') {
      if (numValue < 0 || numValue > 14) {
        return 'pH must be between 0 and 14';
      }
    } else if (name === 'humidity') {
      if (numValue < 0 || numValue > 100) {
        return 'Relative humidity must be between 0 and 100';
      }
    } else if (numValue <= 0) {
      return 'Please enter a positive, non-zero number';
    }
    return '';
  };

  // Function to validate the entire form
  const validateForm = () => {
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        errors[key] = error;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    const error = validateField(name, value);
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setIsLoading(true);
      try {
        const numericFormData = Object.fromEntries(
          Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
        );
        await submitSoilData(numericFormData);
        const recommendations = await getCropRecommendations(numericFormData);
        navigate('/crop-recommendations', { state: { recommendations } });
      } catch (error) {
        console.error('Error submitting soil data:', error);
        setError('Failed to submit soil data or get recommendations. Please try again.');
      } finally {
        setIsSubmitting(false);
        setIsLoading(false);
      }
    }
  };

  // Show loading screen while submitting data
  if (isLoading) {
    return <RecommendationLoadingScreen />;
  }

  // Show error message if data fetching or submission failed
  if (error) return <div className={styles.error}>{error}</div>;
  
  // Show loading message while initial content is being fetched
  if (!pageContent) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.soilDataContainer}>
      <h1 className={styles.title}>{pageContent.title}</h1>
      <p className={styles.description}>{pageContent.description}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        {Object.keys(formData).map((field) => (
          <div key={field} className={styles.formGroup}>
            <label htmlFor={field}>{fieldLabels[field]}</label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={formErrors[field] ? styles.inputError : ''}
            />
            {formErrors[field] && <span className={styles.errorMessage}>{formErrors[field]}</span>}
          </div>
        ))}
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Getting Recommendations...' : 'Get Crop Recommendations'}
        </button>
      </form>
    </div>
  );
};

export default SoilDataPage;