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
          const forecastPayload = Array.isArray(response.data) ? response.data : [];
          setForecast(forecastPayload);
        } catch (error) {
          console.error('Error fetching forecast:', error);
          setForecast([]);
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

  const fiveDayForecast = Object.values(
    forecast.reduce((acc, item) => {
      const itemDate = new Date(item.date);
      const dayKey = itemDate.toISOString().split('T')[0];

      if (!acc[dayKey]) {
        acc[dayKey] = {
          dayKey,
          items: []
        };
      }

      acc[dayKey].items.push(item);
      return acc;
    }, {})
  )
    .slice(0, 5)
    .map((day) => {
      const representative = day.items.reduce((best, current) => {
        const bestHourDistance = Math.abs(new Date(best.date).getHours() - 12);
        const currentHourDistance = Math.abs(new Date(current.date).getHours() - 12);
        return currentHourDistance < bestHourDistance ? current : best;
      }, day.items[0]);

      const temps = day.items.map((entry) => entry.temperature);
      const dayDate = new Date(day.dayKey);

      return {
        dayLabel: dayDate.toLocaleDateString('en-US', { weekday: 'short' }),
        dateLabel: dayDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        minTemp: Math.min(...temps),
        maxTemp: Math.max(...temps),
        description: representative.description
      };
    });

  return (
    <div className="grid w-full gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      <section className="surface-card w-full overflow-hidden p-0 dark:bg-slate-900/70 dark:border-slate-700/50">
        <div className="border-b border-slate-200/60 px-5 py-5 sm:px-6 dark:border-slate-700/50">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">Forecast</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Next 24 hours</h2>
            </div>
            <p className="text-xs uppercase tracking-wide muted-text dark:text-slate-400">City: {city}</p>
          </div>
        </div>

        <div className="px-5 py-5 sm:px-6">
            <div className="mb-5 rounded-3xl border border-slate-200/80 bg-white/70 p-4 dark:border-slate-700/50 dark:bg-slate-800/60">
              <label htmlFor="timeShift" className="mb-2 block text-xs font-semibold uppercase tracking-wide muted-text dark:text-slate-400">
                Time Shift: {timeShift}h
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
              <div className="flex max-w-full gap-3 overflow-x-auto pb-2">
                {visibleForecast.map((item, index) => (
                  <div
                    key={index}
                    className="w-[110px] shrink-0 rounded-3xl border border-slate-200/80 bg-white/85 p-4 text-center shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 dark:border-slate-700/50 dark:bg-slate-800/70"
                  >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide muted-text dark:text-slate-400">
                      {new Date(item.date).toLocaleTimeString('en-US', { hour: '2-digit', hour12: true })}
                    </p>
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900/95 text-3xl text-white dark:bg-slate-700">
                      {getWeatherIcon(item.description)}
                    </div>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{Math.round(item.temperature)}°C</p>
                    <p className="mt-1 line-clamp-2 text-xs capitalize muted-text dark:text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm muted-text dark:text-slate-400">No forecast data available for this time window</p>
            )}
        </div>
      </section>

      <aside className="surface-card w-full overflow-hidden p-4 dark:bg-slate-900/70 dark:border-slate-700/50">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">5-Day Forecast</h3>
        {loading ? (
          <p className="mt-4 text-sm muted-text dark:text-slate-400">Loading daily forecast...</p>
        ) : fiveDayForecast.length > 0 ? (
          <div className="mt-4 space-y-3">
            {fiveDayForecast.map((day) => (
              <div
                key={day.dayLabel + day.dateLabel}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-2 dark:border-slate-700/50 dark:bg-slate-800/60"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{day.dayLabel}</p>
                  <p className="text-xs muted-text dark:text-slate-400">{day.dateLabel}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getWeatherIcon(day.description)}</span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm muted-text dark:text-slate-400">No 5-day forecast data available.</p>
        )}
      </aside>
    </div>
  );
};

export default Forecast;
