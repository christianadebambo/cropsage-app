import React, { useState, useEffect, useCallback } from 'react';
import { getContactPageContent, submitContactForm } from '../services/api';
import styles from './ContactPage.module.css';
import useScrollFix from '../components/useScrollFix';

const ContactPage = () => {
  // State for storing page content, form data, errors, and UI states
  const [pageContent, setPageContent] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Custom hook to fix scroll issues
  useScrollFix();

  // Function to fetch contact page content
  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const content = await getContactPageContent();
      setPageContent(content);
      // Initialize form data based on fetched form fields
      const initialFormData = {};
      content.formFields.forEach(field => {
        initialFormData[field.name] = '';
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error fetching Contact page content:', error);
      setError('Failed to load Contact page data. Please try again later.');
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
    setSubmitMessage(''); // Clear the submit message when the user starts typing

    // Clear the specific field error when the user starts typing
    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await submitContactForm(formData);
        setSubmitMessage('Thank you for your message. We will get back to you soon!');
        // Reset form data after successful submission
        setFormData(prevState => {
          const resetState = {};
          Object.keys(prevState).forEach(key => {
            resetState[key] = '';
          });
          return resetState;
        });
      } catch (error) {
        setSubmitMessage('An error occurred. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.contactTitle}>{pageContent.title}</h1>
      <p className={styles.contactDescription}>{pageContent.description}</p>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        {pageContent.formFields.map((field) => (
          <div key={field.name} className={styles.formGroup}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={errors[field.name] ? styles.inputError : ''}
              ></textarea>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={errors[field.name] ? styles.inputError : ''}
              />
            )}
            {errors[field.name] && <span className={styles.errorMessage}>{errors[field.name]}</span>}
          </div>
        ))}
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : pageContent.submitButtonText}
        </button>
      </form>
      {submitMessage && !isSubmitting && Object.values(formData).every(value => !value.trim()) && (
        <div className={styles.submitMessage}>{submitMessage}</div>
      )}
    </div>
  );
};

export default ContactPage;