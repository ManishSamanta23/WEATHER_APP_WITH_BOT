import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  temperature: Number,
  feelsLike: Number,
  humidity: Number,
  pressure: Number,
  windSpeed: Number,
  description: String,
  icon: String,
  latitude: Number,
  longitude: Number,
  timestamp: {
    type: Date,
    default: Date.now,
    expires: 3600 // Auto-delete after 1 hour
  }
});

export default mongoose.model('Weather', weatherSchema);
