import express from 'express';
import { getWeatherStats, clearOldData } from '../controllers/statsController.js';

const router = express.Router();

router.get('/stats', getWeatherStats);
router.delete('/clear-old', clearOldData);

export default router;
