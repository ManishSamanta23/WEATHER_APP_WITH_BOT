import React, { useState, useEffect } from 'react';
import { fetchForecast } from '../utils/api';
import getWeatherIcon from '../utils/weatherHelpers';

const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeShift, setTimeShift] = useState(0);

  useEffect(() => {
    if (city) {
      const loadForecast = async () => {
        setLoading(true);
        try {
          const response = await fetchForecast(city);
          setForecast(response.data || []);
        } catch (error) {
          console.error('Error fetching forecast:', error);
        } finally {
          setLoading(false);
        }
      };

      loadForecast();
    }
  }, [city]);

  if (!city) return null;

  const now = new Date();
  const shiftedStart = new Date(now.getTime() + timeShift * 60 * 60 * 1000);
  const shiftedEnd = new Date(shiftedStart.getTime() + 24 * 60 * 60 * 1000);

  const visibleForecast = forecast
    .filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= shiftedStart && itemDate <= shiftedEnd;
    })
    .slice(0, 8);

  return (
    <div className="surface-card p-5 sm:p-6 dark:bg-slate-900/70 dark:border-slate-700/50">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">5-Day Forecast</h2>
        <p className="text-xs uppercase tracking-wide muted-text dark:text-slate-400">City: {city}</p>
      </div>
      <div className="mb-5 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700/50 dark:bg-slate-800/60">
        <label htmlFor="timeShift" className="mb-2 block text-xs font-semibold uppercase tracking-wide muted-text dark:text-slate-400">
          Time Shift (0-24 hours): {timeShift}
        </label>
        <input
          id="timeShift"
          type="range"
          min="0"
          max="24"
          step="1"
          value={timeShift}
          onChange={(e) => setTimeShift(Number(e.target.value))}
          className="w-full accent-teal-500"
        />
      </div>
      
      {loading ? (
        <div className="py-8 text-center text-sm muted-text dark:text-slate-400">Loading forecast...</div>
      ) : visibleForecast.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
          {visibleForecast.map((item, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white/80 p-3 text-center dark:border-slate-700/50 dark:bg-slate-800/60">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide muted-text dark:text-slate-400">
                {new Date(item.date).toLocaleTimeString('en-US', { hour: '2-digit', hour12: true })}
              </p>
              <p className="mb-2 text-3xl">{getWeatherIcon(item.description)}</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{Math.round(item.temperature)}°C</p>
              <p className="mt-1 text-xs capitalize muted-text dark:text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm muted-text dark:text-slate-400">No forecast data available for this time window</p>
      )}
    </div>
  );
};

export default Forecast;
