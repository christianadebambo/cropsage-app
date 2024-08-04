import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getRegistrationContent, registerUser } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import styles from './RegisterPage.module.css';
import useScrollFix from '../components/useScrollFix';

const RegisterPage = () => {
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

  // Function to fetch registration page content
  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const content = await getRegistrationContent();
      setPageContent(content);
      // Initialize form data based on fetched form fields
      const initialFormData = {};
      content.formFields.forEach(field => {
        initialFormData[field.name] = '';
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error fetching Registration page content:', error);
      setError('Failed to load Registration page data. Please try again later.');
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
    pageContent.formFields.forEach(field => {
      if (!formData[field.name].trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    if (formData.email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    setErrors(prevState => ({
      ...prevState,
      submit: ''
    }));
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await registerUser(formData);
        login(); // Update auth state
        navigate('/dashboard'); // Redirect to dashboard on successful registration
      } catch (error) {
        setErrors({ submit: error.response?.data?.message || 'Registration failed' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>{pageContent.title}</h1>
      <p className={styles.registerDescription}>{pageContent.description}</p>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
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
          {isSubmitting ? 'Registering...' : pageContent.submitButtonText}
        </button>
        {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}
      </form>
      <p className={styles.loginLink}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default RegisterPage;