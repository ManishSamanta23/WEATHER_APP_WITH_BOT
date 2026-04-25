import express from 'express';
import {
  getWeatherByCity,
  getWeatherByCoordinates,
  getForecast,
  getWeatherHistory,
  searchCities
} from '../controllers/weatherController.js';

const router = express.Router();

router.get('/city/:city', getWeatherByCity);
router.get('/coordinates/:lat/:lon', getWeatherByCoordinates);
router.get('/forecast/:city', getForecast);
router.get('/history', getWeatherHistory);
router.get('/search-cities/:query', searchCities);

export default router;
