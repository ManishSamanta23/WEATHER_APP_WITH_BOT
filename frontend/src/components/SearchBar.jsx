import React, { useState } from 'react';
import useWeather from '../hooks/useWeather';
import getWeatherIcon from '../utils/weatherHelpers';
import { fetchCitySuggestions } from '../utils/api';

const SearchBar = ({ onWeatherUpdate, onCityResolved, selectedCity }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { weather, loading, error, fetchWeather, fetchWeatherByCoords } = useWeather();
  const lastRequestedCityRef = React.useRef('');
  const attemptedInitialGeoRef = React.useRef(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      fetchWeather(input);
      setSuggestions([]);
      setInput('');
    }
  };

  const handleInputChange = async (value) => {
    setInput(value);

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetchCitySuggestions(value.trim());
      setSuggestions(response.data || []);
    } catch {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    fetchWeather(suggestion.name);
    if (onCityResolved) {
      onCityResolved(suggestion.name);
    }
    setInput(suggestion.label || suggestion.name);
    setSuggestions([]);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation || loading) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const data = await fetchWeatherByCoords(latitude, longitude);
        if (data?.city && onCityResolved) {
          onCityResolved(data.city);
        }
      },
      () => {
        // Keep existing error state handling from hook for API failures only.
      }
    );
  };

  // Update parent component whenever weather changes
  React.useEffect(() => {
    if (weather && onWeatherUpdate) {
      onWeatherUpdate(weather);
    }
    if (weather?.city && onCityResolved) {
      onCityResolved(weather.city);
    }
  }, [weather, onWeatherUpdate, onCityResolved]);

  React.useEffect(() => {
    if (!selectedCity) return;
    if (selectedCity === lastRequestedCityRef.current) return;
    lastRequestedCityRef.current = selectedCity;
    fetchWeather(selectedCity);
  }, [selectedCity, fetchWeather]);

  React.useEffect(() => {
    if (attemptedInitialGeoRef.current) return;
    attemptedInitialGeoRef.current = true;

    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await fetchWeatherByCoords(latitude, longitude);
      if (data?.city && onCityResolved) {
        onCityResolved(data.city);
      }
    });
  }, [fetchWeatherByCoords, onCityResolved]);

  return (
    <div className="w-full">
      <form
        onSubmit={handleSearch}
        className="surface-card overflow-hidden p-4 sm:p-5 dark:bg-slate-900/70 dark:border-slate-700/50"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">Live weather</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">Search by city or use your location</h2>
          </div>
          <div className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700/50 dark:bg-slate-800/70 dark:text-slate-300">
            Powered by OpenWeather
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search for a city..."
              className="focus-ring w-full rounded-2xl border border-slate-300/70 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 dark:border-slate-600/50 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />

            {suggestions.length > 0 && (
              <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700/50 dark:bg-slate-800">
                {suggestions.map((item, index) => (
                  <button
                    key={`${item.name}-${item.country}-${index}`}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full border-b border-slate-100 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700/50 dark:text-slate-200 dark:hover:bg-slate-700/80"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            My Location
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/50 dark:bg-red-900/30 dark:text-red-300">
          {error}
        </div>
      )}

      {weather && (
        <div className="surface-card mt-6 overflow-hidden dark:bg-slate-900/70 dark:border-slate-700/50">
          <div className="relative p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-teal-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />

            <div className="relative space-y-8">
              {/* Main weather summary */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div className="flex gap-4">
                  <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-3xl border border-white/40 bg-slate-900/95 text-6xl shadow-xl dark:bg-slate-800">
                    {getWeatherIcon(weather.description)}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                      {weather.locationLabel || `${weather.city}, ${weather.country}`}
                    </p>
                    <h2 className="mt-2 text-5xl font-bold leading-none text-slate-900 dark:text-white sm:text-6xl">
                      {weather.temperature}°C
                    </h2>
                    <p className="mt-3 text-sm capitalize muted-text dark:text-slate-400">{weather.description}</p>
                  </div>
                </div>
              </div>

              {/* Metric cards - clean 2x2 grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 sm:p-6 dark:border-slate-700/50 dark:bg-slate-800/70">
                  <p className="text-xs font-semibold uppercase tracking-wider muted-text dark:text-slate-400">Feels like</p>
                  <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{weather.feelsLike}°C</p>
                </div>
                <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 sm:p-6 dark:border-slate-700/50 dark:bg-slate-800/70">
                  <p className="text-xs font-semibold uppercase tracking-wider muted-text dark:text-slate-400">Humidity</p>
                  <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{weather.humidity}%</p>
                </div>
                <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 sm:p-6 dark:border-slate-700/50 dark:bg-slate-800/70">
                  <p className="text-xs font-semibold uppercase tracking-wider muted-text dark:text-slate-400">Wind speed</p>
                  <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{Math.round(weather.windSpeed * 3.6)} km/h</p>
                </div>
                <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 sm:p-6 dark:border-slate-700/50 dark:bg-slate-800/70">
                  <p className="text-xs font-semibold uppercase tracking-wider muted-text dark:text-slate-400">Pressure</p>
                  <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{weather.pressure} hPa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
