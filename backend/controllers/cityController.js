import City from '../models/City.js';

// Get all cities
export const getAllCities = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { country: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const cities = await City.find(query).limit(100);
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cities', error: error.message });
  }
};

// Add a city
export const addCity = async (req, res) => {
  try {
    const { name, country, countryCode, latitude, longitude } = req.body;

    if (!name || !country) {
      return res.status(400).json({ message: 'Name and country are required' });
    }

    const city = await City.create({
      name,
      country,
      countryCode,
      latitude,
      longitude
    });

    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Error adding city', error: error.message });
  }
};

// Seed cities data
export const seedCities = async (req, res) => {
  try {
    const cities = [
      { name: 'Delhi', country: 'India', countryCode: 'IN', latitude: 28.7041, longitude: 77.1025 },
      { name: 'Mumbai', country: 'India', countryCode: 'IN', latitude: 19.0760, longitude: 72.8777 },
      { name: 'Bangalore', country: 'India', countryCode: 'IN', latitude: 12.9716, longitude: 77.5946 },
      { name: 'Kolkata', country: 'India', countryCode: 'IN', latitude: 22.5726, longitude: 88.3639 },
      { name: 'Chennai', country: 'India', countryCode: 'IN', latitude: 13.0827, longitude: 80.2707 },
      { name: 'New York', country: 'USA', countryCode: 'US', latitude: 40.7128, longitude: -74.0060 },
      { name: 'London', country: 'UK', countryCode: 'GB', latitude: 51.5074, longitude: -0.1278 },
      { name: 'Tokyo', country: 'Japan', countryCode: 'JP', latitude: 35.6762, longitude: 139.6503 },
      { name: 'Paris', country: 'France', countryCode: 'FR', latitude: 48.8566, longitude: 2.3522 },
      { name: 'Dubai', country: 'UAE', countryCode: 'AE', latitude: 25.2048, longitude: 55.2708 }
    ];

    await City.deleteMany({});
    const seededCities = await City.insertMany(cities);
    res.json({ message: 'Cities seeded successfully', count: seededCities.length });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding cities', error: error.message });
  }
};
