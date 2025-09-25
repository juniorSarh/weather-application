import React from 'react';

type Props = {
  forecastData: any;
  onSelectDay: (date: string) => void;
};

export default function WeekForecast({ forecastData, onSelectDay }: Props) {
  const groupedByDate: Record<string, any[]> = {};

  forecastData.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!groupedByDate[date]) groupedByDate[date] = [];
    groupedByDate[date].push(item);
  });

  const getAverageTemp = (list: any[]) =>
    (list.reduce((acc, item) => acc + item.main.temp, 0) / list.length).toFixed(1);

  return (
    <div>
      <h3>📆 5-Day Forecast</h3>
      <ul>
        {Object.entries(groupedByDate).map(([date, items]) => (
          <li key={date} onClick={() => onSelectDay(date)} style={{ cursor: 'pointer' }}>
            <strong>{date}</strong> — {items[0].weather[0].description}, Avg Temp: {getAverageTemp(items)}°C
          </li>
        ))}
      </ul>
    </div>
  );
}
