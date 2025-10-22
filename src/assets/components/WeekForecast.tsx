
import styles from './WeekForecast.module.css';
import { useSettings } from '../context/SettingsContext';
import { formatTemp } from '../utils/units';

type ForecastItem = {
  dt_txt: string;
  main: { temp: number };
  weather: Array<{ description: string; icon: string }>;
};

interface Props {
  forecastData: { list?: ForecastItem[] };
  onSelectDay: (date: string) => void;
}

export default function WeekForecast({ forecastData, onSelectDay }: Props) {
  const { unit } = useSettings();

  const groupedByDate: Record<string, ForecastItem[]> = {};
  const list: ForecastItem[] = Array.isArray(forecastData?.list)
    ? forecastData.list
    : [];

  list.forEach((item: ForecastItem) => {
    const date = (item.dt_txt ?? '').split(' ')[0];
    if (!date) return;
    if (!groupedByDate[date]) groupedByDate[date] = [];
    groupedByDate[date].push(item);
  });

  const dailySummaries = Object.keys(groupedByDate).map((date) => {
    const dayItems = groupedByDate[date];
    const temps = dayItems.map((i) => i.main.temp);
    const icons = dayItems.map((i) => i.weather?.[0]?.icon ?? '01d');
    const descriptions = dayItems.map((i) => i.weather?.[0]?.description ?? '');

    const mid = Math.floor(Math.max(1, icons.length) / 2) - 1 >= 0 ? Math.floor(Math.max(1, icons.length) / 2) - 1 : 0;

    return {
      date,
      minTemp: temps.length ? Math.min(...temps) : 0,
      maxTemp: temps.length ? Math.max(...temps) : 0,
      icon: icons[icons[mid] ? mid : 0] ?? '01d',
      description: descriptions[descriptions[mid] ? mid : 0] ?? '',
    };
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>7-Day Forecast</h3>
      <div className={styles.cards}>
        {dailySummaries.map((day) => (
          <div
            key={day.date}
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
              alt={day.description || 'weather'}
            />
            <p className={styles.temps}>
              {formatTemp(day.minTemp, unit)} / {formatTemp(day.maxTemp, unit)}
            </p>
            <p className={styles.status}>{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
