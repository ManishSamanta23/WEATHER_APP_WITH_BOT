# 🌍 AI Weather App - MERN Stack

A full-stack weather application built with the MERN Stack (MongoDB, Express, React, Node.js) with Tailwind CSS styling.

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **API**: OpenWeatherMap API

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- OpenWeatherMap API Key

## 📦 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AI\ Weather\ APP
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-app
OPENWEATHER_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. MongoDB Setup (Local)

Option A: Using Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Option B: Direct MongoDB Installation
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Install and start the MongoDB service

## 🏃 Running the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

## 📁 Project Structure

```
AI Weather APP/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── controllers/      # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── server.js        # Express server
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   ├── utils/       # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/          # Static assets
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Weather Routes
- `GET /api/weather/city/:city` - Get weather by city name
- `GET /api/weather/coordinates/:lat/:lon` - Get weather by coordinates
- `GET /api/weather/forecast/:city` - Get 5-day forecast
- `GET /api/weather/history` - Get weather history

### City Routes
- `GET /api/cities` - Get all cities
- `POST /api/cities` - Add a new city
- `POST /api/cities/seed` - Seed cities data

## 🎨 Features

- 🔍 Search weather by city name
- 📍 Get weather by geolocation
- 📊 5-day weather forecast
- 🏙️ Popular cities list
- 📱 Responsive design with Tailwind CSS
- 🎯 Modern UI with backdrop blur effects
- ⚡ Fast performance with Vite

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with nodemon
```

### Frontend Development
```bash
cd frontend
npm run dev  # Runs with Vite dev server
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend runs as-is
```

## 🔑 Getting an OpenWeatherMap API Key

1. Visit [openweathermap.org](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your backend `.env` file

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-app
OPENWEATHER_API_KEY=your_api_key
JWT_SECRET=your_secret
NODE_ENV=development
```

### Frontend
The frontend automatically proxies API requests to `http://localhost:5000` in development mode.

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist folder
```

### Backend Deployment (Heroku/Railway)
- Push to your hosting service
- Set environment variables
- Ensure MongoDB connection string is updated

## 📚 Technologies Used

### Frontend
- React 18
- Vite (Build tool)
- Tailwind CSS (Styling)
- Axios (HTTP client)
- React Router (Navigation)

### Backend
- Express.js (Web framework)
- MongoDB (Database)
- Mongoose (ODM)
- Axios (HTTP client)
- Nodemon (Development)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 💬 Support

For issues and questions, please open an issue on GitHub or contact the development team.

## 🔄 Next Steps

1. Install dependencies: `npm install` in both backend and frontend
2. Configure MongoDB connection
3. Get your OpenWeatherMap API key
4. Run both servers
5. Open http://localhost:3000 in your browser

---

**Happy Weather Tracking! 🌤️**
