# 🎨 Frontend Development Guide

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header.jsx      # Header component
│   │   ├── SearchBar.jsx   # Weather search component
│   │   ├── CityList.jsx    # List of popular cities
│   │   ├── Forecast.jsx    # Weather forecast display
│   │   └── Footer.jsx      # Footer component
│   ├── pages/              # Page components
│   │   └── Home.jsx        # Main home page
│   ├── hooks/              # Custom React hooks
│   │   └── useWeather.js   # Weather data hook
│   ├── utils/              # Utility functions
│   │   ├── api.js          # API calls
│   │   └── weatherHelpers.js # Weather utilities
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # React DOM entry point
│   └── index.css           # Global styles + Tailwind
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
└── postcss.config.js       # PostCSS config
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Server runs on `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

## Key Technologies

### Vite
- Lightning-fast build tool
- Hot Module Replacement (HMR)
- Optimized production builds

### Tailwind CSS
- Utility-first CSS framework
- Already configured with custom theme
- Supports dark mode

### Axios
- Promise-based HTTP client
- Automatic proxy to backend API

## Component Structure

### SearchBar Component
```jsx
<SearchBar />
```
Handles city weather search with real-time display.

### CityList Component
```jsx
<CityList onCitySelect={handleCitySelect} />
```
Displays popular cities with search filtering.

### Forecast Component
```jsx
<Forecast city={selectedCity} />
```
Shows 5-day weather forecast for selected city.

## Custom Hooks

### useWeather Hook
```javascript
const { weather, loading, error, fetchWeather } = useWeather();
```

## API Integration

All API calls are centralized in `src/utils/api.js`:

```javascript
import { 
  fetchWeatherByCity, 
  fetchCities,
  fetchForecast 
} from '../utils/api';
```

## Tailwind CSS Customization

Update colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'primary': '#1e40af',
      'secondary': '#0891b2',
      'accent': '#f97316',
    }
  }
}
```

## Environment Variables

Frontend uses proxy for backend API in development:

```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

## Adding New Components

1. Create component file in `src/components/`
2. Write React component
3. Export and import in parent component

Example:
```jsx
// src/components/WeatherCard.jsx
export default function WeatherCard({ data }) {
  return (
    <div className="bg-white/10 rounded-xl p-6">
      {/* Component content */}
    </div>
  );
}
```

## Styling with Tailwind CSS

All components use Tailwind CSS classes:

```jsx
<div className="bg-gradient-to-br from-blue-900 to-cyan-700 text-white rounded-lg p-6">
  Content
</div>
```

## Performance Optimization

- Component lazy loading with React.lazy()
- Image optimization
- CSS purging for production builds
- Minified production bundle

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Troubleshooting

### Port 3000 Already in Use
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### API Proxy Not Working
- Ensure backend is running on port 5000
- Check vite.config.js proxy settings
- Clear browser cache

### Tailwind Classes Not Applied
- Check tailwind.config.js content paths
- Rebuild with `npm run build`
- Clear PostCSS cache

## Deployment

### Vercel
```bash
npm run build
vercel
```

### Netlify
```bash
npm run build
netlify deploy
```

### AWS S3 + CloudFront
```bash
npm run build
# Upload dist folder to S3
```

## Development Best Practices

- Keep components small and focused
- Use custom hooks for logic
- Centralize API calls
- Use Tailwind CSS utilities
- Test responsive design
- Keep state management simple

---

For more information, check the main README.md file.
