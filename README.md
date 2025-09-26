<img src="https://socialify.git.ci/juniorSarh/weather-application/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="weather-application" width="640" height="320" />

# 🌦️ React Weather App

A modern, responsive weather application built with **React + TypeScript** that displays current weather conditions, hourly forecasts, and weekly forecasts using the **OpenWeatherMap API**. It includes features such as geolocation detection, search and save favorite locations, theme customization, display unit switching, offline caching, and weather alerts.

---

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

### ✅ Weather Alerts
- Displays **severe weather alerts** (when available).
- Plans for push notifications (web-compatible where supported).

### ✅ Multiple Locations
- Save up to **20 favorite locations**.
- Easily switch between saved cities.
- Persisted via `localStorage`.

### ✅ Customization
- Switch between **light and dark themes** (optional feature).
- Toggle between **Celsius and Fahrenheit** units.

### ✅ Offline Access
- Caches last fetched weather data for offline usage.
- Loads last successful weather data on startup if offline.

### ✅ Performance Optimized
- Fast-loading with async/await API calls.
- Lazy-loaded components and efficient rendering.
- Loading states and error messages handled smoothly.

### ✅ Privacy & Security
- Only reads location data with permission.
- All user data stored securely in browser `localStorage`.
- No unnecessary data collection or sharing.

---

## 🖼️ User Interface

### 🎯 User-Friendly Design
- Clean and intuitive layout
- Easy city search + clear input feedback
- Visual indicators for interactivity (hover, active states)
- Forecast visual layout for better readability

### 🔁 Interactivity
- Hover effects on buttons and saved locations
- Responsive cursor changes for interactive elements
- Smooth transitions between components

### 📱 Responsive Design
Fully responsive at these breakpoints:
- `320px` (Small phones)
- `480px` (Phones)
- `768px` (Tablets)
- `1024px` (Desktops)
- `1200px` (Large desktops)

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


### ✅ UI & UX
- Intuitive navigation
- Smooth feedback on interactions
- Accessible layout and typography

### ✅ Functionality
- Location detection, search, save
- Current, hourly, and weekly weather
- Unit toggling & theme support (optional)
- Error states and fallbacks (e.g., location denied)

### ✅ React & TypeScript Practices
- Reusable components
- Proper use of `useState`, `useEffect`, props
- Clear, consistent naming and component logic


### ✅ Responsive Layout
- Works across all required screen sizes
- Sidebar collapses or shifts on smaller screens (if implemented)

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
