import Weather from '../models/Weather.js';

export const getWeatherStats = async (req, res) => {
  try {
    const stats = await Weather.aggregate([
      {
        $group: {
          _id: '$city',
          avgTemp: { $avg: '$temperature' },
          maxTemp: { $max: '$temperature' },
          minTemp: { $min: '$temperature' },
          count: { $sum: 1 }
        }
      },
      { $limit: 10 }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};

export const clearOldData = async (req, res) => {
  try {
    const result = await Weather.deleteMany({
      timestamp: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({ 
      message: 'Old data cleared', 
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing data', error: error.message });
  }
};
