import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const isValidWeatherPayload = (data) => {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.city === 'string' &&
    typeof data.temperature !== 'undefined' &&
    typeof data.description === 'string'
  );
};

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/weather/city/${encodeURIComponent(city)}`);
      if (!isValidWeatherPayload(response.data)) {
        throw new Error('Invalid weather response payload');
      }
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
      const response = await axios.get(`${API_BASE_URL}/weather/coordinates/${lat}/${lon}`);
      if (!isValidWeatherPayload(response.data)) {
        throw new Error('Invalid weather response payload');
      }
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
