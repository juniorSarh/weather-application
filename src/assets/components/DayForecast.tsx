import React from 'react';

type Props = {
  forecastData: any;
  selectedDate: string;
};

export default function DayForecast({ forecastData, selectedDate }: Props) {
  const filtered = forecastData.list.filter((entry: any) =>
    entry.dt_txt.startsWith(selectedDate)
  );

  return (
    <div>
      <h3>🕒 Hourly Forecast for {selectedDate}</h3>
      <ul>
        {filtered.map((item: any, i: number) => (
          <li key={i}>
            {item.dt_txt.split(' ')[1]} — {item.weather[0].description}, Temp: {item.main.temp}°C
          </li>
        ))}
      </ul>
    </div>
  );
}
