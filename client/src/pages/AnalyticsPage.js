import React, { useState, useEffect } from 'react';
import { getAnalyticsContent } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './AnalyticsPage.module.css';
import useScrollFix from '../components/useScrollFix';

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsPage = () => {
  // State for storing page content and error messages
  const [pageContent, setPageContent] = useState(null);
  const [error, setError] = useState(null);

  // Custom hook to fix scroll issues
  useScrollFix();

  // Effect to fetch analytics content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getAnalyticsContent();
        setPageContent(content);
      } catch (error) {
        console.error('Error fetching analytics content:', error);
        setError('Failed to load analytics content. Please try again later.');
      }
    };
    fetchContent();
  }, []);

  // Show error message if data fetching failed
  if (error) return <div className={styles.error}>{error}</div>;
  
  // Show loading message while data is being fetched
  if (!pageContent) return <div className={styles.loading}>Loading...</div>;

  const hasRecommendations = pageContent.totalRecommendations > 0;

  return (
    <div className={styles.analyticsContainer}>
      <h1 className={styles.title}>{pageContent.title}</h1>
      <p className={styles.description}>{pageContent.description}</p>
      
      {hasRecommendations ? (
        <>
          {/* Overview cards */}
          <div className={styles.overviewCards}>
            <div className={styles.card}>
              <h3>Total Recommendations</h3>
              <p className={styles.bigNumber}>{pageContent.totalRecommendations}</p>
            </div>
            <div className={styles.card}>
              <h3>Average Soil pH</h3>
              <p className={styles.bigNumber}>{pageContent.averageSoilData.ph.toFixed(2)}</p>
            </div>
          </div>

          {/* Crop Distribution Pie Chart */}
          <div className={styles.chartContainer}>
            <h2>Crop Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pageContent.cropDistribution}
                  dataKey="count"
                  nameKey="crop"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {pageContent.cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

           {/* Average Soil Composition Bar Chart */}
          <div className={styles.chartContainer}>
            <h2>Average Soil Composition</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(pageContent.averageSoilData).map(([key, value]) => ({ name: key, value: Number(value.toFixed(2)) }))}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        // Display message when no recommendations are available
        <div className={styles.noDataMessage}>
          <p>You don't have any recommendations yet. Start by getting your first crop recommendation!</p>
          <a href="/soil-data" className={styles.ctaButton}>Get Crop Recommendation</a>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;