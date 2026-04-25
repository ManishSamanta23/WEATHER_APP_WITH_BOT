# 🚀 Backend Development Guide

## Project Structure

```
backend/
├── models/                  # MongoDB schemas
│   ├── Weather.js          # Weather data schema
│   └── City.js             # City data schema
├── controllers/            # Business logic
│   ├── weatherController.js # Weather logic
│   ├── cityController.js   # City logic
│   └── statsController.js  # Statistics logic
├── routes/                 # API routes
│   ├── weatherRoutes.js   # Weather endpoints
│   ├── cityRoutes.js      # City endpoints
│   └── statsRoutes.js     # Statistics endpoints
├── middleware/            # Custom middleware
│   ├── auth.js            # JWT authentication
│   ├── logger.js          # Request logging
│   └── errorHandler.js    # Error handling
├── server.js              # Express server setup
├── package.json
├── .env                   # Environment variables
└── .env.example          # Example env file
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-app
OPENWEATHER_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### 3. Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or local MongoDB
mongod
```

### 4. Run Development Server
```bash
npm run dev
```
Server runs on `http://localhost:5000` with nodemon auto-reload.

## Key Technologies

### Express.js
- Lightweight web framework
- Middleware support
- Flexible routing

### MongoDB + Mongoose
- NoSQL database
- Schema validation with Mongoose ODM
- Auto-expiring TTL indexes

### Axios
- HTTP client for external APIs
- OpenWeatherMap API integration

## Database Models

### Weather Model
```javascript
{
  city: String,
  country: String,
  temperature: Number,
  feelsLike: Number,
  humidity: Number,
  pressure: Number,
  windSpeed: Number,
  description: String,
  icon: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date (auto-expires after 1 hour)
}
```

### City Model
```javascript
{
  name: String,
  country: String,
  countryCode: String,
  latitude: Number,
  longitude: Number,
  createdAt: Date
}
```

## API Routes

### Weather Routes (`/api/weather`)
- `GET /city/:city` - Get weather by city
- `GET /coordinates/:lat/:lon` - Get weather by coords
- `GET /forecast/:city` - Get 5-day forecast
- `GET /history` - Get weather history

### City Routes (`/api/cities`)
- `GET /` - Get all cities
- `POST /` - Add new city
- `POST /seed` - Seed cities data

## Controllers

Each controller handles specific business logic:

### weatherController.js
- Fetches data from OpenWeatherMap API
- Saves to MongoDB
- Returns formatted responses

### cityController.js
- Manages city data
- Search functionality
- Database seeding

### statsController.js
- Aggregates weather statistics
- Cleanup of old data

## Middleware

### errorHandler.js
Global error handling middleware. Catches and formats all errors.

### auth.js
JWT token verification. Add to protected routes.

### logger.js
Request logging with timestamps and duration.

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/weather-app
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/weather-app

# External API
OPENWEATHER_API_KEY=your_api_key_from_openweathermap

# Security
JWT_SECRET=your_secret_key_for_jwt
```

## Common Tasks

### Add New Endpoint

1. Create model in `models/`
2. Create controller in `controllers/`
3. Create route in `routes/`
4. Import route in `server.js`

Example:
```javascript
// models/User.js
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// controllers/userController.js
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// routes/userRoutes.js
router.get('/', getUsers);

// server.js
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);
```

### Connect to MongoDB Atlas

Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/weather-app?retryWrites=true&w=majority
```

### Test Endpoints

Using cURL:
```bash
# Get weather
curl http://localhost:5000/api/weather/city/London

# Get cities
curl http://localhost:5000/api/cities

# Seed cities
curl -X POST http://localhost:5000/api/cities/seed
```

Using Postman:
1. Import the API endpoints
2. Set environment variables
3. Run requests

## Debugging

### Enable Verbose Logging
```javascript
// In server.js
mongoose.set('debug', true);
```

### Check Database Connection
```bash
# Connect to MongoDB
mongosh

# List databases
show dbs

# Use weather-app database
use weather-app

# List collections
show collections

# Query data
db.weathers.find().limit(5)
```

### Environment Variables Not Loading
```bash
# Check .env file exists
ls -la .env

# Check NODE_ENV
echo $NODE_ENV
```

## Performance Tips

1. **Add Indexes**
   ```javascript
   weatherSchema.index({ city: 1 });
   weatherSchema.index({ timestamp: -1 });
   ```

2. **Implement Caching**
   ```javascript
   const cache = new Map();
   ```

3. **Use Pagination**
   ```javascript
   const limit = parseInt(req.query.limit) || 10;
   const skip = parseInt(req.query.skip) || 0;
   ```

4. **Add Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

## Security Best Practices

1. ✅ Use environment variables for secrets
2. ✅ Validate all inputs
3. ✅ Use HTTPS in production
4. ✅ Add rate limiting
5. ✅ Implement CORS properly
6. ✅ Add request sanitization
7. ✅ Use helmet for headers

```bash
npm install helmet
```

## Deployment

### Heroku
```bash
heroku create weather-app
git push heroku main
```

### Railway
```bash
railway login
railway init
railway deploy
```

### AWS/Azure
- Use Dockerfile provided
- Set environment variables
- Configure MongoDB Atlas
- Deploy with CI/CD

## Troubleshooting

### MongoDB Connection Error
```
MongooseError: Cannot connect to MongoDB
```
Solution:
- Check MongoDB is running
- Verify MongoDB URI in .env
- Check credentials for Atlas

### Port 5000 Already in Use
```bash
# Kill process
lsof -i :5000
kill -9 <PID>
```

### Nodemon Not Reloading
```bash
# Clear cache
rm -rf node_modules/.cache
npm run dev
```

### API Key Issues
- Verify OPENWEATHER_API_KEY is set
- Check API key is valid
- Check rate limits on API

## Testing

### Integration Tests
```bash
npm install --save-dev jest supertest
```

### Unit Tests
```javascript
// Example test
describe('Weather Controller', () => {
  it('should fetch weather data', async () => {
    // Test code
  });
});
```

## Next Steps

1. Set up MongoDB connection
2. Get OpenWeatherMap API key
3. Configure environment variables
4. Run development server
5. Test API endpoints
6. Deploy to production

---

For API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
