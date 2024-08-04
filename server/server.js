require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorHandler = require('./utils/errorHandler');

// Import route modules
const homeRoutes = require('./routes/homeRoutes');
const faqRoutes = require('./routes/faqRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const soilDataRoutes = require('./routes/soilDataRoutes');
const cropRecommendationsRoutes = require('./routes/cropRecommendationsRoutes');
const reportRoutes = require('./routes/reportRoutes');
const historicalRecommendationsRoutes = require('./routes/historicalRecommendationsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const resourcesRoutes = require('./routes/resourcesRoutes');

const app = express();

// Configure CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'cropsage'
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define API routes
app.use('/api/home', homeRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/soil-data', soilDataRoutes);
app.use('/api/crop-recommendations', cropRecommendationsRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/historical-recommendations', historicalRecommendationsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/resources', resourcesRoutes);

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Global error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));