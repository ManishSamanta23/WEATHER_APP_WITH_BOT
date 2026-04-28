import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CityList from '../components/CityList';
import Forecast from '../components/Forecast';
import Footer from '../components/Footer';
import ChatAssistant from '../components/ChatAssistant';

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    updateDarkMode(savedDarkMode);
  }, []);

  const updateDarkMode = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    updateDarkMode(newDarkMode);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="relative min-h-screen overflow-hidden pb-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="pointer-events-none absolute -left-48 top-28 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/20" />
      <div className="pointer-events-none absolute -right-56 bottom-24 h-[28rem] w-[28rem] rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-900/20" />

      <Header isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />
      
      <main className="relative mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          <div className="space-y-6">
            <SearchBar
              onWeatherUpdate={setCurrentWeather}
              onCityResolved={setSelectedCity}
              selectedCity={selectedCity}
            />
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <CityList onCitySelect={handleCitySelect} />
          </div>

          <div className="lg:col-span-2">
            <Forecast city={selectedCity} />
          </div>
        </div>
      </main>

      <Footer />

      <ChatAssistant weather={currentWeather} />
    </div>
  );
};

export default Home;
