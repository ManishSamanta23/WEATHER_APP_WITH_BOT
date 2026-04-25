# 🎯 Quick Start Guide

## 📋 Prerequisites

- Node.js 16+ installed
- MongoDB running (local or Atlas)
- OpenWeatherMap API key (free tier available)

## ⚡ Quick Setup (5 minutes)

### Step 1: Navigate to Project
```bash
cd "AI Weather APP"
```

### Step 2: Run Setup Script
**Windows:**
```bash
setup.bat
```

**macOS/Linux:**
```bash
bash setup.sh
```

Or manually:
```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### Step 3: Configure Backend
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-app
OPENWEATHER_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### Step 4: Start MongoDB
```bash
# Docker (recommended)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or local MongoDB
mongod
```

### Step 5: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 6: Open App
```
http://localhost:3000
```

## 🔑 Getting OpenWeatherMap API Key

1. Visit: https://openweathermap.org/api
2. Sign up (free)
3. Get API key from account settings
4. Add to backend/.env

## 📁 Project Structure

```
AI Weather APP/
├── backend/          # Node.js + Express
│   ├── models/      # MongoDB schemas
│   ├── routes/      # API routes
│   └── server.js    # Entry point
├── frontend/         # React + Vite
│   ├── src/         # React components
│   └── package.json
└── README.md        # Full documentation
```

## 🚀 Available Commands

### Backend
```bash
npm run dev       # Start with nodemon
npm start        # Start production
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
```

### Root
```bash
npm run install:all      # Install all dependencies
npm run dev:all          # Start both servers
npm run docker:up        # Start with Docker Compose
npm run docker:down      # Stop Docker containers
```

## 🐳 Using Docker (Optional)

```bash
docker-compose up -d
```

Runs MongoDB, Backend, and Frontend in containers.

## ✅ Testing the App

1. **Search Weather:**
   - Type city name in search
   - Click Search
   - View weather details

2. **View Forecast:**
   - Select from city list
   - See 5-day forecast below

3. **Check API:**
   - Visit: http://localhost:5000/api/health
   - Should return: `{"status":"OK","message":"Server is running"}`

## 🆘 Troubleshooting

### MongoDB Connection Error
```bash
# Start MongoDB
docker run -d -p 27017:27017 mongo:latest
```

### Port Already in Use
```bash
# Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### API Key Error
- Get free key from openweathermap.org
- Add to backend/.env
- Restart backend server

## 📚 Documentation

- [Backend Development](./backend/DEVELOPMENT.md)
- [Frontend Development](./frontend/DEVELOPMENT.md)
- [API Documentation](./backend/API_DOCUMENTATION.md)
- [Main README](./README.md)

## 💡 Next Steps

1. ✅ Get OpenWeatherMap API key
2. ✅ Configure MongoDB connection
3. ✅ Install dependencies
4. ✅ Run both servers
5. ✅ Test the application
6. 🚀 Deploy to production

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)

## 🤝 Need Help?

Check documentation files or common issues in:
- backend/DEVELOPMENT.md
- frontend/DEVELOPMENT.md
- README.md

---

**Happy coding! 🚀**
