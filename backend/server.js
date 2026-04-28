import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/cities', cityRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Weather App API Server',
    version: '1.0.0',
    endpoints: {
      weather: '/api/weather',
      cities: '/api/cities',
      health: '/api/health'
    }
  });
});

// Error Handling Middleware
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
