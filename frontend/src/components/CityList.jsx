import React, { useState, useEffect } from 'react';

const CityList = ({ onCitySelect }) => {
  const [cities, setCities] = useState([
    { _id: '1', name: 'Delhi', country: 'India', countryCode: 'IN' },
    { _id: '2', name: 'Mumbai', country: 'India', countryCode: 'IN' },
    { _id: '3', name: 'Bangalore', country: 'India', countryCode: 'IN' },
    { _id: '4', name: 'Hyderabad', country: 'India', countryCode: 'IN' },
    { _id: '5', name: 'Kolkata', country: 'India', countryCode: 'IN' },
    { _id: '6', name: 'Chennai', country: 'India', countryCode: 'IN' },
    { _id: '7', name: 'Pune', country: 'India', countryCode: 'IN' },
    { _id: '8', name: 'Jaipur', country: 'India', countryCode: 'IN' },
    { _id: '9', name: 'Lucknow', country: 'India', countryCode: 'IN' },
    { _id: '10', name: 'Chandigarh', country: 'India', countryCode: 'IN' },
    { _id: '11', name: 'New York', country: 'USA', countryCode: 'US' },
    { _id: '12', name: 'London', country: 'United Kingdom', countryCode: 'GB' },
    { _id: '13', name: 'Tokyo', country: 'Japan', countryCode: 'JP' },
    { _id: '14', name: 'Paris', country: 'France', countryCode: 'FR' },
    { _id: '15', name: 'Dubai', country: 'UAE', countryCode: 'AE' },
    { _id: '16', name: 'Singapore', country: 'Singapore', countryCode: 'SG' },
    { _id: '17', name: 'Sydney', country: 'Australia', countryCode: 'AU' },
    { _id: '18', name: 'Toronto', country: 'Canada', countryCode: 'CA' },
    { _id: '19', name: 'Berlin', country: 'Germany', countryCode: 'DE' },
    { _id: '20', name: 'Barcelona', country: 'Spain', countryCode: 'ES' }
  ]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="surface-card w-full p-5 sm:p-6 dark:bg-slate-900/70 dark:border-slate-700/50">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Popular Cities</h2>
        <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-slate-700/50 dark:text-slate-300">
          {filteredCities.length}
        </span>
      </div>
      
      <input
        type="text"
        placeholder="Filter cities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="focus-ring mb-4 w-full rounded-2xl border border-slate-300/70 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 dark:border-slate-600/50 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
      />

      {loading ? (
        <div className="py-8 text-center text-sm muted-text dark:text-slate-400">Loading cities...</div>
      ) : (
        <div className="max-h-[28rem] space-y-2 overflow-y-auto pr-1">
          {filteredCities.map((city) => (
            <button
              key={city._id}
              onClick={() => onCitySelect(city.name)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-left text-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-white dark:border-slate-700/50 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 dark:hover:border-teal-600/50"
            >
              <div className="font-semibold text-slate-900 dark:text-white">{city.name}</div>
              <div className="text-xs muted-text dark:text-slate-400">{city.country}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityList;
