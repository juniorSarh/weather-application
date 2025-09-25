import { useEffect, useState } from 'react';
import styles from './WeatherHome.module.css';
import WeekForecast from './WeekForecast';
import DayForecast from './DayForecast';

const API_KEY = 'cd80adfd71e8991d53ad29edd68abd19';

export default function WeatherHome() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // ✅ Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      // Get current weather
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const currentRes = await fetch(currentUrl);
      if (!currentRes.ok) throw new Error('Failed to get current location weather');
      const currentData = await currentRes.json();
      setWeatherData(currentData);

      // Get forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error('Failed to get forecast');
      const forecastJson = await forecastRes.json();
      setForecastData(forecastJson);

      const firstDate = forecastJson.list[0].dt_txt.split(' ')[0];
      setSelectedDate(firstDate);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch location data');
    }
  };

  // ✅ Fetch weather by city search
  const fetchWeather = async () => {
    if (!city) return;

    try {
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const currentRes = await fetch(currentUrl);
      if (!currentRes.ok) throw new Error('City not found');
      const currentData = await currentRes.json();
      setWeatherData(currentData);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${API_KEY}&units=metric`;
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error('Failed to fetch forecast');
      const forecastJson = await forecastRes.json();
      setForecastData(forecastJson);

      const firstDate = forecastJson.list[0].dt_txt.split(' ')[0];
      setSelectedDate(firstDate);

      setError('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch data');
      setWeatherData(null);
      setForecastData(null);
    }
  };

  // ✅ Get current location on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Location access denied. Please search manually.');
        }
      );
    } else {
      setError('Geolocation not supported in this browser');
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather App</h1>

      {/* Input */}
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.input}
        />
        <button onClick={fetchWeather} className={styles.button}>Search</button>
      </div>

      {/* Error */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Current Weather */}
      {weatherData && (
        <div className={styles.weatherInfo}>
          <h2 className={styles.weatherTitle}>{weatherData.name}</h2>
          <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
          <p>🌥️ Condition: {weatherData.weather[0].description}</p>
          <p>💨 Wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}

      {/* Forecast */}
      {forecastData && selectedDate && (
        <>
          <DayForecast forecastData={forecastData} selectedDate={selectedDate} />
          <WeekForecast forecastData={forecastData} onSelectDay={setSelectedDate} />
        </>
      )}
    </div>
  );
}
