import axios from 'axios';

const API_BASE_URL = '/api';

export const fetchWeatherByCity = (city) => 
  axios.get(`${API_BASE_URL}/weather/city/${city}`);

export const fetchWeatherByCoordinates = (lat, lon) => 
  axios.get(`${API_BASE_URL}/weather/coordinates/${lat}/${lon}`);

export const fetchForecast = (city) => 
  axios.get(`${API_BASE_URL}/weather/forecast/${city}`);

export const fetchCities = (search = '') => 
  axios.get(`${API_BASE_URL}/cities`, { params: { search } });

export const fetchWeatherHistory = (city = '', limit = 10) => 
  axios.get(`${API_BASE_URL}/weather/history`, { 
    params: { city, limit } 
  });

export const fetchCitySuggestions = (query) =>
  axios.get(`${API_BASE_URL}/weather/search-cities/${encodeURIComponent(query)}`);
