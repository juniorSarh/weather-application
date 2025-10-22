import WeatherHome from './WeatherHome';
import styles from './Weathermain.module.css';

interface Props {
  externalCity?: string;
}



export default function WeatherMain({ externalCity }: Props) {
  return (
    <>
    <div className={styles.maincomponent}> 
      <WeatherHome externalCity={externalCity} />
    </div>
    </>
  );
}
