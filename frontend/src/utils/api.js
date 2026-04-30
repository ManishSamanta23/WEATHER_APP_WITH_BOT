import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/_/backend/api';

export const fetchWeatherByCity = (city) => 
  axios.get(`${API_BASE_URL}/weather/city/${encodeURIComponent(city)}`);

export const fetchWeatherByCoordinates = (lat, lon) => 
  axios.get(`${API_BASE_URL}/weather/coordinates/${lat}/${lon}`);

export const fetchForecast = (city) => 
  axios.get(`${API_BASE_URL}/weather/forecast/${encodeURIComponent(city)}`);

export const fetchCities = (search = '') => 
  axios.get(`${API_BASE_URL}/cities`, { params: { search } });

export const fetchWeatherHistory = (city = '', limit = 10) => 
  axios.get(`${API_BASE_URL}/weather/history`, { 
    params: { city, limit } 
  });

export const fetchCitySuggestions = (query) =>
  axios.get(`${API_BASE_URL}/weather/search-cities/${encodeURIComponent(query)}`);

export const sendChatMessage = (message, context) =>
  axios.post(`${API_BASE_URL}/chat/send`, { message, context });
