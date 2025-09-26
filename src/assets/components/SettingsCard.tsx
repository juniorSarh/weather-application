import React from 'react';
import styles from './SettingsCard.module.css';
import { useSettings } from '../context/SettingsContext'; // Make sure context is created

const SettingsCard = () => {
  const {
    isDarkTheme,
    toggleTheme,
    unit,
    setUnit,
    notificationsEnabled,
    toggleNotifications,
  } = useSettings();

  return (
    <div className={styles.settingsCard}>
      <div className={styles.settingsHeader}>
        <span role="img" aria-label="settings">⚙️</span>
        <h2>Settings</h2>
      </div>

      <div className={styles.settingItem}>
        <span>Theme</span>
        <button onClick={toggleTheme}>
          {isDarkTheme ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div className={styles.settingItem}>
        <span>Temperature Unit</span>
        <div className={styles.unitButtons}>
          <button
            className={unit === 'celsius' ? styles.active : ''}
            onClick={() => setUnit('celsius')}
          >
            °C
          </button>
          <button
            className={unit === 'fahrenheit' ? styles.active : ''}
            onClick={() => setUnit('fahrenheit')}
          >
            °F
          </button>
        </div>
      </div>

      <div className={styles.settingItem}>
        <span>Weather Notifications</span>
        <button onClick={toggleNotifications}>
          {notificationsEnabled ? '🔔 On' : '🔕 Off'}
        </button>
      </div>
    </div>
  );
};

export default SettingsCard;
