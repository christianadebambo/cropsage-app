const mongoose = require('mongoose');

// Define the recommendation schema
const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  soilData: {
    N: Number,
    P: Number,
    K: Number,
    temperature: Number,
    humidity: Number,
    ph: Number,
    rainfall: Number
  },
  recommendedCrop: String,
  sustainablePractices: [String],
  reportId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);