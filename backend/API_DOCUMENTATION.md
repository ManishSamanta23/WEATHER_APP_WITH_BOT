# 🌍 Weather App Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Some endpoints may require JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Weather Endpoints

### Get Weather by City Name
```http
GET /weather/city/:city
```

**Parameters:**
- `city` (string, required) - City name (e.g., "London", "New York")

**Response Example:**
```json
{
  "city": "London",
  "country": "GB",
  "temperature": 15.3,
  "feelsLike": 14.8,
  "humidity": 72,
  "pressure": 1013,
  "windSpeed": 3.2,
  "description": "partly cloudy",
  "icon": "02d",
  "latitude": 51.5074,
  "longitude": -0.1278,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Get Weather by Coordinates
```http
GET /weather/coordinates/:lat/:lon
```

**Parameters:**
- `lat` (number, required) - Latitude
- `lon` (number, required) - Longitude

**Response:** Same as above

---

### Get 5-Day Forecast
```http
GET /weather/forecast/:city
```

**Parameters:**
- `city` (string, required) - City name

**Response:**
```json
[
  {
    "date": "2024-01-15T12:00:00Z",
    "temperature": 16.5,
    "feelsLike": 15.9,
    "humidity": 68,
    "description": "clear sky",
    "icon": "01d",
    "windSpeed": 2.8
  },
  ...
]
```

---

### Get Weather History
```http
GET /weather/history?city=London&limit=10
```

**Query Parameters:**
- `city` (string, optional) - Filter by city name
- `limit` (number, optional, default=10) - Number of records to return

**Response:**
```json
[
  { ...weather data... },
  { ...weather data... }
]
```

---

## City Endpoints

### Get All Cities
```http
GET /cities?search=London
```

**Query Parameters:**
- `search` (string, optional) - Search by city name or country

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Delhi",
    "country": "India",
    "countryCode": "IN",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "createdAt": "2024-01-15T10:00:00Z"
  },
  ...
]
```

---

### Add a City
```http
POST /cities
Content-Type: application/json

{
  "name": "Tokyo",
  "country": "Japan",
  "countryCode": "JP",
  "latitude": 35.6762,
  "longitude": 139.6503
}
```

**Response:** Created city object (201 Created)

---

### Seed Cities Data
```http
POST /cities/seed
```

Populates the database with pre-defined major cities.

**Response:**
```json
{
  "message": "Cities seeded successfully",
  "count": 10
}
```

---

## Statistics Endpoints

### Get Weather Statistics
```http
GET /stats
```

Returns aggregated weather statistics for top 10 cities.

**Response:**
```json
[
  {
    "_id": "London",
    "avgTemp": 15.2,
    "maxTemp": 18.5,
    "minTemp": 12.1,
    "count": 45
  },
  ...
]
```

---

### Clear Old Data
```http
DELETE /stats/clear-old
```

Removes weather records older than 7 days.

**Response:**
```json
{
  "message": "Old data cleared",
  "deletedCount": 150
}
```

---

## Health Check

### Server Status
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "City name is required"
}
```

### 404 Not Found
```json
{
  "message": "City not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error fetching weather data",
  "error": "Error details..."
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting middleware for production use.

## Environment Variables Required

```env
OPENWEATHER_API_KEY=your_api_key
MONGODB_URI=mongodb://localhost:27017/weather-app
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## Examples Using cURL

### Get Weather
```bash
curl http://localhost:5000/api/weather/city/London
```

### Get Forecast
```bash
curl http://localhost:5000/api/weather/forecast/London
```

### Get All Cities
```bash
curl http://localhost:5000/api/cities
```

### Search Cities
```bash
curl "http://localhost:5000/api/cities?search=New"
```

### Seed Cities
```bash
curl -X POST http://localhost:5000/api/cities/seed
```
