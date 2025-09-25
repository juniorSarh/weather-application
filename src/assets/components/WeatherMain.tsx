import React from 'react';
import Sidebar from './SideBar';
import WeatherHome from './WeatherHome';
import styles from './WeatherMain.module.css'; // ✅ import the CSS module

export default function WeatherMain() {
  return (
    <>
    <div className={styles.maincomponent}> {/* ✅ use CSS module class */}
      <Sidebar />
      <WeatherHome />
      
    </div>
    </>
  );
}
