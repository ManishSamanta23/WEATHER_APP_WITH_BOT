export const getWeatherStats = async (req, res) => {
  try {
    // No database available - return empty stats
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};

export const clearOldData = async (req, res) => {
  try {
    // No database to clear - return success
    res.json({ 
      message: 'No database - nothing to clear', 
      deletedCount: 0 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing data', error: error.message });
  }
};
