
import Sidebar from './SideBar';
import WeatherHome from './WeatherHome';
import styles from './WeatherMain.module.css';


export default function WeatherMain() {
  return (
    <>
    <div className={styles.maincomponent}> 
      <Sidebar />
      <WeatherHome />
      
    </div>
    </>
  );
}
