# Project Structure Overview

## Complete MERN Stack Project Tree

```
AI Weather APP/
│
├── 📁 backend/                    # Node.js + Express Backend
│   ├── 📁 models/
│   │   ├── Weather.js            # MongoDB Weather schema
│   │   └── City.js               # MongoDB City schema
│   │
│   ├── 📁 controllers/
│   │   ├── weatherController.js  # Weather logic
│   │   ├── cityController.js     # City logic
│   │   └── statsController.js    # Statistics logic
│   │
│   ├── 📁 routes/
│   │   ├── weatherRoutes.js      # Weather endpoints
│   │   ├── cityRoutes.js         # City endpoints
│   │   └── statsRoutes.js        # Statistics endpoints
│   │
│   ├── 📁 middleware/
│   │   ├── auth.js               # JWT authentication
│   │   ├── logger.js             # Request logging
│   │   └── errorHandler.js       # Error handling
│   │
│   ├── server.js                 # Express app setup
│   ├── package.json              # Backend dependencies
│   ├── .env.example              # Environment template
│   ├── Dockerfile                # Docker config
│   ├── DEVELOPMENT.md            # Backend guide
│   └── API_DOCUMENTATION.md      # API reference
│
│
├── 📁 frontend/                   # React + Vite Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Header.jsx        # Header component
│   │   │   ├── SearchBar.jsx     # Search component
│   │   │   ├── CityList.jsx      # Cities list
│   │   │   ├── Forecast.jsx      # Forecast display
│   │   │   └── Footer.jsx        # Footer component
│   │   │
│   │   ├── 📁 pages/
│   │   │   └── Home.jsx          # Main page
│   │   │
│   │   ├── 📁 hooks/
│   │   │   └── useWeather.js     # Weather hook
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── api.js            # API calls
│   │   │   └── weatherHelpers.js # Helpers
│   │   │
│   │   ├── App.jsx               # Root component
│   │   ├── main.jsx              # React entry
│   │   └── index.css             # Global + Tailwind
│   │
│   ├── 📁 public/                # Static assets
│   ├── index.html                # HTML template
│   ├── package.json              # Dependencies
│   ├── vite.config.js            # Vite config
│   ├── tailwind.config.js        # Tailwind config
│   ├── postcss.config.js         # PostCSS config
│   ├── Dockerfile                # Docker config
│   ├── .gitignore                # Git ignore
│   ├── DEVELOPMENT.md            # Frontend guide
│   └── .env.local (optional)     # Local env
│
│
├── 📄 README.md                  # Main documentation
├── 📄 QUICKSTART.md              # 5-minute setup
├── 📄 SETUP_SUMMARY.md           # This summary
├── 📄 DEPLOYMENT.md              # Deployment guide
├── 📄 PROJECT_STRUCTURE.md       # This file
│
├── 📦 package.json               # Root scripts
├── 🐳 docker-compose.yml         # Docker compose
├── 🔧 setup.bat                  # Setup script (Windows)
├── 🔧 setup.sh                   # Setup script (Unix)
├── 📌 .gitignore                 # Git config
│
├── 📁 .git/                      # Git repository
└── 📄 .hintrc                    # HTML hint config

```

## Technology Stack

```
┌─────────────────────────────────────────────────────┐
│                    Frontend Layer                    │
├─────────────────────────────────────────────────────┤
│  React 18.2  │  Vite 5.0  │  Tailwind CSS 3.3      │
│  Axios 1.5   │  React Router 6.16                   │
└─────────────────────────────────────────────────────┘
         ↓ (HTTP) ↓         ↓ (HTTPS Production)
┌─────────────────────────────────────────────────────┐
│                    Backend Layer                     │
├─────────────────────────────────────────────────────┤
│  Express.js 4.18  │  Node.js 16+  │  Nodemon       │
│  Mongoose 7.5     │  Axios 1.5    │  CORS 2.8      │
└─────────────────────────────────────────────────────┘
         ↓ (Mongoose) ↓
┌─────────────────────────────────────────────────────┐
│                  Database Layer                      │
├─────────────────────────────────────────────────────┤
│        MongoDB 5.0+ (Local or MongoDB Atlas)        │
│  Collections: Weather, Cities, Stats (if added)     │
└─────────────────────────────────────────────────────┘

```

## Component Hierarchy

```
App
└── Home
    ├── Header
    ├── SearchBar
    │   └── (displays weather on search)
    ├── Forecast
    │   └── (shows 5-day weather)
    ├── CityList
    │   └── (popular cities with search)
    └── Footer
```

## API Route Structure

```
/api
├── /weather
│   ├── GET  /city/:city
│   ├── GET  /coordinates/:lat/:lon
│   ├── GET  /forecast/:city
│   └── GET  /history?city=&limit=
├── /cities
│   ├── GET  /
│   ├── POST /
│   └── POST /seed
└── /health
    └── GET  /
```

## Data Flow

```
User Interaction (Frontend)
        ↓
React Component State Update
        ↓
API Call (Axios)
        ↓
Express Route Handler
        ↓
Controller Logic
        ↓
MongoDB Query/Save
        ↓
Response JSON
        ↓
Frontend Display Update
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────┐
│         Internet / Users                         │
└──────────────────┬───────────────────────────────┘
                   ↓
        ┌──────────────────────┐
        │   CDN / Domain       │
        └──────────┬───────────┘
                   ↓
    ┌──────────────┴──────────────┐
    ↓                             ↓
┌─────────────┐         ┌──────────────────┐
│  Frontend   │         │  Backend         │
│ (Vercel/    │         │ (Heroku/         │
│  Netlify)   │         │  Railway/AWS)    │
└─────────────┘         └────────┬─────────┘
                                 ↓
                        ┌──────────────────┐
                        │  MongoDB Atlas   │
                        │  (Cloud DB)      │
                        └──────────────────┘
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/weather-app
OPENWEATHER_API_KEY=your_api_key
JWT_SECRET=your_secret
```

### Frontend (vite.config.js proxy)
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

## Development vs Production

### Development
- Frontend: Vite dev server (http://localhost:3000)
- Backend: Express + Nodemon (http://localhost:5000)
- Database: Local MongoDB
- Hot reload enabled

### Production
- Frontend: Built static assets (dist/)
- Backend: Node.js server
- Database: MongoDB Atlas
- HTTPS enabled
- CDN for assets
- Optimized bundles

## Key File Purposes

| File | Purpose |
|------|---------|
| server.js | Express app initialization |
| App.jsx | React root component |
| models/Weather.js | Data schema definition |
| weatherController.js | Business logic |
| weatherRoutes.js | Endpoint definitions |
| SearchBar.jsx | UI component |
| useWeather.js | Custom React hook |
| api.js | API call centralization |
| vite.config.js | Build tool config |
| tailwind.config.js | Styling config |
| docker-compose.yml | Container orchestration |

## Getting Started Path

```
1. Install Node.js & MongoDB
           ↓
2. Clone/Setup Project
           ↓
3. Install Dependencies (npm install)
           ↓
4. Configure .env file
           ↓
5. Start MongoDB
           ↓
6. Start Backend (npm run dev in backend/)
           ↓
7. Start Frontend (npm run dev in frontend/)
           ↓
8. Open http://localhost:3000
           ↓
9. Test Weather App
           ↓
10. Deploy to Production
```

## Common Commands

### Installation
```bash
npm install                    # Root
cd backend && npm install      # Backend
cd frontend && npm install     # Frontend
```

### Development
```bash
npm run dev:all               # Both servers (root)
cd backend && npm run dev     # Backend only
cd frontend && npm run dev    # Frontend only
```

### Production
```bash
npm run build:frontend        # Build frontend
cd backend && npm start       # Start backend
```

### Docker
```bash
docker-compose up -d          # Start all services
docker-compose down           # Stop all services
docker-compose build          # Build images
```

## Notes

- 🔐 Never commit `.env` files
- 📦 Dependencies are in `node_modules/` (gitignored)
- 🌐 Frontend proxies API calls to backend
- 🗄️ MongoDB should be running before backend
- 🚀 Both servers must be running for full app
- 📱 Responsive design works on all devices
- 🎨 Tailwind CSS allows easy customization

---

For detailed information, see:
- README.md - Complete documentation
- QUICKSTART.md - 5-minute setup
- DEPLOYMENT.md - Production guide
- backend/DEVELOPMENT.md - Backend details
- frontend/DEVELOPMENT.md - Frontend details
