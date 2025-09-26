
import styles from './WeekForecast.module.css';

interface Props {
  forecastData: any;
  onSelectDay: (date: string) => void;
}

export default function WeekForecast({ forecastData, onSelectDay }: Props) {
  const groupedByDate: Record<string, any[]> = {};

  forecastData.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(item);
  });

  const dailySummaries = Object.keys(groupedByDate).map(date => {
    const dayItems = groupedByDate[date];
    const temps = dayItems.map(i => i.main.temp);
    const icons = dayItems.map(i => i.weather[0].icon);
    const descriptions = dayItems.map(i => i.weather[0].description);

    return {
      date,
      minTemp: Math.min(...temps),
      maxTemp: Math.max(...temps),
      icon: icons[Math.floor(icons.length / 2)], // middle of the day
      description: descriptions[Math.floor(descriptions.length / 2)],
    };
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>7-Day Forecast</h3>
      <div className={styles.cards}>
        {dailySummaries.map((day, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => onSelectDay(day.date)}
          >
            <p className={styles.date}>
              {new Date(day.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
            />
            <p className={styles.temps}>
              {Math.round(day.minTemp)}° / {Math.round(day.maxTemp)}°
            </p>
            <p className={styles.status}>{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
