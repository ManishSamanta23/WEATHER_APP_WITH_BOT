import express from 'express';
import {
  getAllCities,
  addCity,
  seedCities
} from '../controllers/cityController.js';

const router = express.Router();

router.get('/', getAllCities);
router.post('/', addCity);
router.post('/seed', seedCities);

export default router;
