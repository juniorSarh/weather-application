import { useEffect, useState } from "react";
import styles from "./WeatherHome.module.css";
import WeekForecast from "./WeekForecast";
import DayForecast from "./DayForecast";
import type { SavedLocation } from "../../types";

/** ===== Types for OpenWeather responses (minimal fields you use) ===== */
type WeatherNow = {
  name: string;
  coord: { lat: number; lon: number };
  main: { temp: number; humidity?: number };
  wind: { speed: number };
  weather: Array<{ description: string; icon: string }>;
};

type ForecastItem = {
  dt_txt: string; // "YYYY-MM-DD HH:mm:ss"
  main: { temp: number };
  weather: Array<{ description: string; icon: string }>;
};

type Forecast5d = {
  list: ForecastItem[];
};

/** ===== Env + constants ===== */
const API_KEY =
  import.meta.env.VITE_OPENWEATHER_KEY || "cd80adfd71e8991d53ad29edd68abd19";
const FALLBACK_CITY = "Johannesburg";

export default function WeatherHome() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherNow | null>(null);
  const [forecastData, setForecastData] = useState<Forecast5d | null>(null);
  const [error, setError] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  // ✅ Save city to localStorage
  const saveLastCity = (cityName: string) => {
    localStorage.setItem("lastCity", cityName);
  };

  // ✅ Save list of saved locations
  const saveLocationsToStorage = (locations: SavedLocation[]) => {
    localStorage.setItem("savedLocations", JSON.stringify(locations));
  };

  // ✅ Load saved locations from storage
  const loadSavedLocations = () => {
    const saved = localStorage.getItem("savedLocations");
    if (saved) {
      try {
        setSavedLocations(JSON.parse(saved) as SavedLocation[]);
      } catch (err) {
        console.error("Failed to parse saved locations:", err);
      }
    }
  };

  // ✅ Save current city to saved list
  const handleSaveCity = () => {
    if (!weatherData?.name) return;
    const cityName = weatherData.name;
    const alreadySaved = savedLocations.some((loc) => loc.name === cityName);

    if (!alreadySaved) {
      const updatedLocations = [...savedLocations, { name: cityName }];
      setSavedLocations(updatedLocations);
      saveLocationsToStorage(updatedLocations);
    }
  };

  useEffect(() => {
    loadSavedLocations();
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      void fetchWeatherByCity(lastCity);
    } else {
      fetchWeatherByLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeatherByCity = async (cityName: string) => {
    if (!cityName) return;
    setLoading(true);

    try {
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityName
      )}&appid=${encodeURIComponent(API_KEY)}&units=metric`;

      const currentRes = await fetch(currentUrl);
      if (!currentRes.ok) throw new Error("City not found");

      const currentData = (await currentRes.json()) as WeatherNow;
      setWeatherData(currentData);
      saveLastCity(cityName);

      const { lat, lon } = currentData.coord;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${encodeURIComponent(
        API_KEY
      )}&units=metric`;

      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error("Failed to fetch forecast");

      const forecastJson = (await forecastRes.json()) as Forecast5d;
      setForecastData(forecastJson);

      const firstDate = forecastJson.list?.[0]?.dt_txt?.split(" ")[0] ?? null;
      setSelectedDate(firstDate);
      setError("");
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to fetch data";
      setError(message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      void fetchWeatherByCity(FALLBACK_CITY);
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${encodeURIComponent(
            API_KEY
          )}&units=metric`;

          const currentRes = await fetch(currentUrl);
          if (!currentRes.ok) throw new Error("Failed to get current weather");

          const currentData = (await currentRes.json()) as WeatherNow;
          setWeatherData(currentData);
          saveLastCity(currentData.name);

          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${encodeURIComponent(
            API_KEY
          )}&units=metric`;

          const forecastRes = await fetch(forecastUrl);
          if (!forecastRes.ok) throw new Error("Failed to get forecast");

          const forecastJson = (await forecastRes.json()) as Forecast5d;
          setForecastData(forecastJson);

          const firstDate =
            forecastJson.list?.[0]?.dt_txt?.split(" ")[0] ?? null;
          setSelectedDate(firstDate);
          setError("");
        } catch (err: unknown) {
          console.error(err);
          const message =
            err instanceof Error
              ? err.message
              : "Failed to fetch location data";
          setError(message);
          void fetchWeatherByCity(FALLBACK_CITY);
        } finally {
          setLoading(false);
        }
      },
      (geoErr: GeolocationPositionError) => {
        console.error("Geolocation error:", geoErr);
        setError("Location access denied. Using fallback city.");
        void fetchWeatherByCity(FALLBACK_CITY);
      }
    );
  };

  const handleSearch = () => {
    void fetchWeatherByCity(city);
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
              src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@2x.png`}
              alt={weatherData.weather?.[0]?.description ?? "weather icon"}
            />
            <p>{weatherData.weather?.[0]?.description}</p>
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
          <WeekForecast
            forecastData={forecastData}
            onSelectDay={setSelectedDate}
          />
        </>
      )}
    </div>
  );
}
