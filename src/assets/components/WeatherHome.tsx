import { useEffect, useState } from 'react';
import styles from './WeatherHome.module.css';
import WeekForecast from './WeekForecast';
import DayForecast from './DayForecast';
import type { SavedLocation } from '../../types';

const API_KEY = 'cd80adfd71e8991d53ad29edd68abd19';
const FALLBACK_CITY = 'Johannesburg';

export default function WeatherHome() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  // ✅ Save city to localStorage
  const saveLastCity = (cityName: string) => {
    localStorage.setItem('lastCity', cityName);
  };

  // ✅ Save list of saved locations
  const saveLocationsToStorage = (locations: SavedLocation[]) => {
    localStorage.setItem('savedLocations', JSON.stringify(locations));
  };

  // ✅ Load saved locations from storage
  const loadSavedLocations = () => {
    const saved = localStorage.getItem('savedLocations');
    if (saved) {
      try {
        setSavedLocations(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved locations:', err);
      }
    }
  };

  // ✅ Save current city to saved list
  const handleSaveCity = () => {
    if (!weatherData || !weatherData.name) return;

    const cityName = weatherData.name;
    const alreadySaved = savedLocations.some(loc => loc.name === cityName);

    if (!alreadySaved) {
      const updatedLocations = [...savedLocations, { name: cityName }];
      setSavedLocations(updatedLocations);
      saveLocationsToStorage(updatedLocations);
    }
  };

  useEffect(() => {
    loadSavedLocations();
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeatherByCity(lastCity);
    } else {
      fetchWeatherByLocation();
    }
  }, []);

  const fetchWeatherByCity = async (cityName: string) => {
    if (!cityName) return;
    setLoading(true);

    try {
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      const currentRes = await fetch(currentUrl);
      if (!currentRes.ok) throw new Error('City not found');
      const currentData = await currentRes.json();
      setWeatherData(currentData);
      saveLastCity(cityName);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${API_KEY}&units=metric`;
      const forecastRes = await fetch(forecastUrl);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      fetchWeatherByCity(FALLBACK_CITY);
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
          const currentRes = await fetch(currentUrl);
          if (!currentRes.ok) throw new Error('Failed to get current weather');
          const currentData = await currentRes.json();
          setWeatherData(currentData);
          saveLastCity(currentData.name);

          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
          const forecastRes = await fetch(forecastUrl);
          const forecastJson = await forecastRes.json();
          setForecastData(forecastJson);

          const firstDate = forecastJson.list[0].dt_txt.split(' ')[0];
          setSelectedDate(firstDate);
          setError('');
        } catch (err: any) {
          console.error(err);
          setError(err.message || 'Failed to fetch location data');
          fetchWeatherByCity(FALLBACK_CITY);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Location access denied. Using fallback city.');
        fetchWeatherByCity(FALLBACK_CITY);
      }
    );
  };

  const handleSearch = () => {
    fetchWeatherByCity(city);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather App</h1>

      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.loading}>Loading weather...</p>}

      {!loading && weatherData && (
        <div className={styles.weatherInfo}>
          <h2 className={styles.weatherTitle}>{weatherData.name}</h2>
          <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
          <div className={styles.condition}>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <p>{weatherData.weather[0].description}</p>
          </div>
          <p>💨 Wind: {weatherData.wind.speed} m/s</p>

          <button className={styles.saveButton} onClick={handleSaveCity}>
            ⭐ Save Location
          </button>
        </div>
      )}

      {!loading && forecastData && selectedDate && (
        <>
          <DayForecast forecastData={forecastData} />
          <WeekForecast forecastData={forecastData} onSelectDay={setSelectedDate} />
        </>
      )}
    </div>
  );
}
