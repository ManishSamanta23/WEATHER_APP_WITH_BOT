import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  countryCode: String,
  latitude: Number,
  longitude: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('City', citySchema);
