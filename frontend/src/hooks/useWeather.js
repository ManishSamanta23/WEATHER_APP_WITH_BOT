import { useState, useCallback } from 'react';
import axios from 'axios';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/weather/city/${encodeURIComponent(city)}`);
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/weather/coordinates/${lat}/${lon}`);
      setWeather(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather by location');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, fetchWeather, fetchWeatherByCoords };
};

export default useWeather;
