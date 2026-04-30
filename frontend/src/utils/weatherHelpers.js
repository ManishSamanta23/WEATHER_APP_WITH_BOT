const getWeatherIcon = (description) => {
  if (typeof description !== 'string') {
    return '🌤️';
  }

  const desc = description.toLowerCase();
  
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('thunderstorm')) return '⛈️';
  if (desc.includes('wind')) return '💨';
  
  return '🌤️';
};

export default getWeatherIcon;
