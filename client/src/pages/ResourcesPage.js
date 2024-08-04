import React, { useState, useEffect } from 'react';
import { getResourcesContent } from '../services/api';
import styles from './ResourcesPage.module.css';
import useScrollFix from '../components/useScrollFix';

const ResourcesPage = () => {
  // State for storing page content, error messages, and loading status
  const [pageContent, setPageContent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Custom hook to fix scroll issues
  useScrollFix();

  // Effect to fetch resources content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getResourcesContent();
        setPageContent(content);
      } catch (error) {
        console.error('Error fetching resources content:', error);
        setError('Failed to load resources content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Show loading message while data is being fetched
  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  
  // Show error message if data fetching failed
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.resourcesContainer}>
      <h1 className={styles.title}>{pageContent.title}</h1>
      <p className={styles.description}>{pageContent.description}</p>
      
      {/* Resources categories */}
      <div className={styles.categoriesContainer}>
        {pageContent.categories.map((category, index) => (
          <div key={index} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category.name}</h2>
            <ul className={styles.resourcesList}>
              {category.resources.map((resource, resourceIndex) => (
                <li key={resourceIndex} className={styles.resourceItem}>
                  <a
                    href={resource.link}
                    className={styles.resourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className={styles.resourceTitle}>{resource.title}</h3>
                    <p className={styles.resourceDescription}>{resource.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;