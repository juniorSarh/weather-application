<img src="https://socialify.git.ci/juniorSarh/weather-application/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="weather-application" width="640" height="320" />



# 🌦️ React Weather App

A modern, responsive weather application built with **React + TypeScript** that displays current weather conditions, hourly forecasts, and weekly forecasts using the **OpenWeatherMap API**. It includes features such as geolocation detection, search and save favorite locations, theme customization, display unit switching, offline caching, and weather alerts.

# Live Demo
Find the live demo on this link https://weather-application-5r2t.onrender.com

---
## 🔐 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
2. Install dependencies
bash
Copy code
npm install
# or
yarn
3. Add API Key
Create a .env file in the root with:

env
Copy code
VITE_WEATHER_API_KEY=your_openweathermap_api_key
Replace your_openweathermap_api_key with your actual API key from https://openweathermap.org/api

4. Start development server
bash
Copy code
npm run dev
# or
yarn dev
```

## 📌 Features

### ✅ Real-Time Weather Information
- Displays current weather:
  - Temperature
  - Humidity
  - Wind speed
- Shows **hourly** and **weekly (daily)** weather forecasts.
- Toggle between **hourly** and **daily** forecasts.

### ✅ Location-Based Forecasting
- Auto-detects user's current location (with permission).
- Allows manual search of any location.
- Shows weather info for both current and searched locations.


### ✅ Customization
- Switch between **light and dark themes** (optional feature).
- Toggle between **Celsius and Fahrenheit** units.
---


## 🛠️ Tech Stack

| Technology     | Purpose                        |
|----------------|--------------------------------|
| **React**      | Frontend UI Library            |
| **TypeScript** | Strongly-typed JavaScript      |
| **CSS Modules**| Scoped and reusable styling    |
| **OpenWeatherMap API** | Weather data provider |
| **LocalStorage** | Persist user preferences     |

---

## 🧱 Project Structure

src/
├── components/
│ ├── WeatherHome.tsx # Main container
│ ├── SavedLocations.tsx # Favorite locations sidebar
│ ├── DayForecast.tsx # Daily weather
│ ├── WeekForecast.tsx # Weekly forecast
├── types/
│ └── index.ts # TypeScript interfaces
├── styles/
│ └── *.module.css # CSS Modules


---
