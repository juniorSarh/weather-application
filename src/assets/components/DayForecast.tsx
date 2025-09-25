import React from 'react';
import styles from './DayForecast.module.css';

interface Props {
  forecastData: any;
}

export default function DayForecast({ forecastData }: Props) {
  // First 8 entries = next 24 hours (3-hour intervals)
  const next24Hours = forecastData?.list?.slice(0, 8) || [];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Next 24 Hours (3-hour intervals)</h3>
      <div className={styles.cards}>
        {next24Hours.map((item: any, index: number) => (
          <div key={index} className={styles.card}>
            <p className={styles.time}>
              {new Date(item.dt_txt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              <br />
              {new Date(item.dt_txt).toLocaleDateString([], {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <img
              className={styles.icon}
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <p className={styles.temp}>{Math.round(item.main.temp)}°C</p>
            <p className={styles.status}>{item.weather[0].description}</p>
            <p className={styles.details}>💧 {item.main.humidity}%</p>
            <p className={styles.details}>💨 {item.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}
