import { useState } from 'react';

const API_KEY = 'cd80adfd71e8991d53ad29edd68abd19';

export default function WeatherHome() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch data');
      setWeatherData(null);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button onClick={fetchWeather} style={{ padding: '8px 16px' }}>
        Search
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weatherData.name}</h2>
          <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
          <p>🌥️ Condition: {weatherData.weather[0].description}</p>
          <p>💨 Wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}