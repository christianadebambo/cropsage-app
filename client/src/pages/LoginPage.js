import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getLoginContent, loginUser } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import styles from './LoginPage.module.css';
import useScrollFix from '../components/useScrollFix';

const LoginPage = () => {
  // State for storing page content, form data, errors, and UI states
  const [pageContent, setPageContent] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  // Custom hook to fix scroll issues
  useScrollFix();

  // Function to fetch login page content
  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const content = await getLoginContent();
      setPageContent(content);
      // Initialize form data based on fetched form fields
      const initialFormData = {};
      content.formFields.forEach(field => {
        initialFormData[field.name] = '';
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error fetching Login page content:', error);
      setError('Failed to load Login page data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to fetch content on component mount
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Show error message if data fetching failed
  if (error) return <div className={styles.error}>{error}</div>;
  
  // Show loading message while data is being fetched
  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  // Function to validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
    // Clear general submission error
    if (errors.submit) {
      setErrors(prevState => ({
        ...prevState,
        submit: ''
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await loginUser(formData);
        login(); // Update auth state
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } catch (error) {
        setErrors({ submit: error.response?.data?.message || 'Login failed' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!pageContent) return <div>Loading...</div>;

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>{pageContent.title}</h1>
      <p className={styles.loginDescription}>{pageContent.description}</p>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {pageContent.formFields.map((field) => (
          <div key={field.name} className={styles.formGroup}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className={errors[field.name] ? styles.inputError : ''}
            />
            {errors[field.name] && <span className={styles.errorMessage}>{errors[field.name]}</span>}
          </div>
        ))}
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : pageContent.submitButtonText}
        </button>
        {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}
      </form>
      <p className={styles.registerLink}>
        New to CropSage? <Link to="/register">Register Now</Link>
      </p>
    </div>
  );
};

export default LoginPage;