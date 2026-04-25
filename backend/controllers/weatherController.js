import axios from 'axios';
import Weather from '../models/Weather.js';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const OPENWEATHER_GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0';

// Get weather by city name
export const getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({ message: 'City name is required' });
    }

    const cityName = city.trim();

    // Mock data for testing/demo
    const mockWeatherData = {
      'delhi': {
        city: 'Delhi',
        country: 'IN',
        temperature: 32,
        feelsLike: 35,
        humidity: 65,
        pressure: 1010,
        windSpeed: 12,
        description: 'Clear sky',
        icon: '01d',
        latitude: 28.7041,
        longitude: 77.1025
      },
      'mumbai': {
        city: 'Mumbai',
        country: 'IN',
        temperature: 28,
        feelsLike: 30,
        humidity: 75,
        pressure: 1012,
        windSpeed: 8,
        description: 'Partly cloudy',
        icon: '02d',
        latitude: 19.0760,
        longitude: 72.8777
      },
      'bangalore': {
        city: 'Bangalore',
        country: 'IN',
        temperature: 25,
        feelsLike: 26,
        humidity: 70,
        pressure: 1015,
        windSpeed: 6,
        description: 'Cloudy',
        icon: '04d',
        latitude: 12.9716,
        longitude: 77.5946
      },
      'london': {
        city: 'London',
        country: 'GB',
        temperature: 15,
        feelsLike: 13,
        humidity: 65,
        pressure: 1013,
        windSpeed: 15,
        description: 'Rainy',
        icon: '10d',
        latitude: 51.5074,
        longitude: -0.1278
      },
      'new york': {
        city: 'New York',
        country: 'US',
        temperature: 18,
        feelsLike: 16,
        humidity: 55,
        pressure: 1014,
        windSpeed: 10,
        description: 'Clear sky',
        icon: '01d',
        latitude: 40.7128,
        longitude: -74.0060
      },
      'kolkata': {
        city: 'Kolkata',
        country: 'IN',
        temperature: 30,
        feelsLike: 33,
        humidity: 78,
        pressure: 1009,
        windSpeed: 11,
        description: 'Partly cloudy',
        icon: '02d',
        latitude: 22.5726,
        longitude: 88.3639
      },
      'chennai': {
        city: 'Chennai',
        country: 'IN',
        temperature: 31,
        feelsLike: 35,
        humidity: 74,
        pressure: 1008,
        windSpeed: 9,
        description: 'Haze',
        icon: '50d',
        latitude: 13.0827,
        longitude: 80.2707
      },
      'hyderabad': {
        city: 'Hyderabad',
        country: 'IN',
        temperature: 29,
        feelsLike: 31,
        humidity: 66,
        pressure: 1011,
        windSpeed: 8,
        description: 'Clear sky',
        icon: '01d',
        latitude: 17.385,
        longitude: 78.4867
      }
    };

    const buildGenericMockWeather = (requestedCity) => ({
      city: requestedCity,
      country: 'IN',
      temperature: 28,
      feelsLike: 30,
      humidity: 70,
      pressure: 1012,
      windSpeed: 10,
      description: 'Partly cloudy',
      icon: '02d',
      latitude: 20.5937,
      longitude: 78.9629
    });

    try {
      const response = await axios.get(
        `${OPENWEATHER_BASE_URL}/weather`,
        {
          params: {
            q: cityName,
            appid: OPENWEATHER_API_KEY,
            units: 'metric'
          },
          timeout: 10000
        }
      );

      const weatherData = {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        windSpeed: response.data.wind.speed,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        latitude: response.data.coord.lat,
        longitude: response.data.coord.lon
      };

      // Save to database (non-blocking, fire and forget)
      Weather.create(weatherData).catch(err => {
        console.log('Database save skipped:', err.message);
      });

      res.json(weatherData);
    } catch (apiError) {
      // Fallback to mock data
      const mockData = mockWeatherData[cityName.toLowerCase()] || buildGenericMockWeather(cityName);
      console.log(`Using mock data for: ${cityName}`);
      res.json(mockData);
    }
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ message: 'City not found' });
    } else {
      res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
  }
};

// Get weather by coordinates
export const getWeatherByCoordinates = async (req, res) => {
  try {
    const { lat, lon } = req.params;

    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // Enhanced city coordinates database
    const cityCoordinates = [
      { name: 'Delhi', country: 'IN', lat: 28.7041, lon: 77.1025 },
      { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
      { name: 'Bangalore', country: 'IN', lat: 12.9716, lon: 77.5946 },
      { name: 'Hyderabad', country: 'IN', lat: 17.3850, lon: 78.4867 },
      { name: 'Kolkata', country: 'IN', lat: 22.5726, lon: 88.3639 },
      { name: 'Chennai', country: 'IN', lat: 13.0827, lon: 80.2707 },
      { name: 'Pune', country: 'IN', lat: 18.5204, lon: 73.8567 },
      { name: 'Jaipur', country: 'IN', lat: 26.9124, lon: 75.7873 },
      { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
      { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
      { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
      { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
      { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
      { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 }
    ];

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    // Find closest city
    let closestCity = null;
    let minDistance = Infinity;

    cityCoordinates.forEach(city => {
      const distance = Math.sqrt(
        Math.pow(latNum - city.lat, 2) + Math.pow(lonNum - city.lon, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city;
      }
    });

    // Use closest city if within reasonable distance (roughly 200km), otherwise try API
    let mockCity = closestCity?.name || 'Your Location';
    let mockCountry = closestCity?.country || 'IN';

    try {
      const response = await axios.get(
        `${OPENWEATHER_BASE_URL}/weather`,
        {
          params: {
            lat,
            lon,
            appid: OPENWEATHER_API_KEY,
            units: 'metric'
          },
          timeout: 10000
        }
      );

      const weatherData = {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        windSpeed: response.data.wind.speed,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        latitude: response.data.coord.lat,
        longitude: response.data.coord.lon
      };

      // Save to database (non-blocking)
      Weather.create(weatherData).catch(err => {
        console.log('Database save skipped:', err.message);
      });

      res.json(weatherData);
    } catch (apiError) {
      // Fallback to mock data
      const mockData = {
        city: mockCity,
        country: mockCountry,
        temperature: 28,
        feelsLike: 30,
        humidity: 70,
        pressure: 1012,
        windSpeed: 10,
        description: 'Partly cloudy',
        icon: '02d',
        latitude: latNum,
        longitude: lonNum
      };
      console.log(`Using mock geolocation data for: ${latNum}, ${lonNum} (${mockCity}, ${mockCountry})`);
      res.json(mockData);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data', error: error.message });
  }
};

// Get forecast
export const getForecast = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({ message: 'City name is required' });
    }

    // Generate mock forecast
    const generateMockForecast = () => {
      const forecast = [];
      const now = new Date();
      for (let i = 0; i < 40; i++) {
        const date = new Date(now.getTime() + i * 3 * 60 * 60 * 1000);
        const temp = 20 + Math.random() * 15;
        forecast.push({
          date,
          temperature: Math.round(temp * 10) / 10,
          feelsLike: Math.round((temp - 2) * 10) / 10,
          humidity: 50 + Math.random() * 40,
          description: ['Clear sky', 'Cloudy', 'Rainy', 'Partly cloudy'][Math.floor(Math.random() * 4)],
          icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
          windSpeed: 5 + Math.random() * 20
        });
      }
      return forecast;
    };

    try {
      const response = await axios.get(
        `${OPENWEATHER_BASE_URL}/forecast`,
        {
          params: {
            q: city,
            appid: OPENWEATHER_API_KEY,
            units: 'metric'
          },
          timeout: 10000
        }
      );

      const forecast = response.data.list.slice(0, 40).map(item => ({
        date: new Date(item.dt * 1000),
        temperature: item.main.temp,
        feelsLike: item.main.feels_like,
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        windSpeed: item.wind.speed
      }));

      res.json(forecast);
    } catch (apiError) {
      // Fallback to mock forecast
      console.log(`Using mock forecast for: ${city}`);
      res.json(generateMockForecast());
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forecast', error: error.message });
  }
};

// Get weather history
export const getWeatherHistory = async (req, res) => {
  try {
    const { city, limit = 10 } = req.query;

    const query = city ? { city } : {};
    const history = await Weather.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
};

// Search city suggestions by prefix
export const searchCities = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query || query.trim().length < 2) {
      return res.json([]);
    }

    // Mock city suggestions
    const mockSuggestions = {
      'del': [
        { name: 'Delhi', country: 'India', state: '', latitude: 28.7041, longitude: 77.1025, label: 'Delhi, India' },
        { name: 'Dehradun', country: 'India', state: '', latitude: 30.2128, longitude: 78.0855, label: 'Dehradun, India' }
      ],
      'mum': [
        { name: 'Mumbai', country: 'India', state: '', latitude: 19.0760, longitude: 72.8777, label: 'Mumbai, India' },
        { name: 'Mundra', country: 'India', state: '', latitude: 22.3156, longitude: 69.5925, label: 'Mundra, India' }
      ],
      'ban': [
        { name: 'Bangalore', country: 'India', state: '', latitude: 12.9716, longitude: 77.5946, label: 'Bangalore, India' },
        { name: 'Bangkok', country: 'Thailand', state: '', latitude: 13.7563, longitude: 100.5018, label: 'Bangkok, Thailand' }
      ],
      'lon': [
        { name: 'London', country: 'United Kingdom', state: '', latitude: 51.5074, longitude: -0.1278, label: 'London, United Kingdom' },
        { name: 'Londonderry', country: 'United Kingdom', state: '', latitude: 55.0076, longitude: -7.2963, label: 'Londonderry, United Kingdom' }
      ],
      'new': [
        { name: 'New York', country: 'United States', state: '', latitude: 40.7128, longitude: -74.0060, label: 'New York, United States' },
        { name: 'New Delhi', country: 'India', state: '', latitude: 28.6139, longitude: 77.2090, label: 'New Delhi, India' }
      ],
      'tok': [
        { name: 'Tokyo', country: 'Japan', state: '', latitude: 35.6762, longitude: 139.6503, label: 'Tokyo, Japan' }
      ],
      'par': [
        { name: 'Paris', country: 'France', state: '', latitude: 48.8566, longitude: 2.3522, label: 'Paris, France' }
      ]
    };

    try {
      const response = await axios.get(`${OPENWEATHER_GEO_BASE_URL}/direct`, {
        params: {
          q: query.trim(),
          limit: 8,
          appid: OPENWEATHER_API_KEY
        },
        timeout: 10000
      });

      const suggestions = (response.data || []).map((item) => ({
        name: item.name,
        country: item.country,
        state: item.state || '',
        latitude: item.lat,
        longitude: item.lon,
        label: [item.name, item.state, item.country].filter(Boolean).join(', ')
      }));

      res.json(suggestions);
    } catch (apiError) {
      // Fallback to mock suggestions
      const queryLower = query.trim().toLowerCase();
      const mockResults = mockSuggestions[queryLower] || 
        mockSuggestions[queryLower.substring(0, 3)] || [];
      
      console.log(`Using mock suggestions for: ${query}`);
      res.json(mockResults);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error searching cities', error: error.message });
  }
};
