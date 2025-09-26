import React, { createContext, useContext, useEffect, useState } from 'react';

type TemperatureUnit = 'celsius' | 'fahrenheit';

interface SettingsContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [unit, setUnitState] = useState<TemperatureUnit>('celsius');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedUnit = localStorage.getItem('unit');
    const savedNotify = localStorage.getItem('weatherNotifications');

    setIsDarkTheme(savedTheme === 'dark');
    if (savedUnit === 'fahrenheit') setUnitState('fahrenheit');
    setNotificationsEnabled(savedNotify !== 'off');
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const setUnit = (newUnit: TemperatureUnit) => {
    setUnitState(newUnit);
    localStorage.setItem('unit', newUnit);
  };

  const toggleNotifications = () => {
    const enabled = !notificationsEnabled;
    setNotificationsEnabled(enabled);
    localStorage.setItem('weatherNotifications', enabled ? 'on' : 'off');
  };

  return (
    <SettingsContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        unit,
        setUnit,
        notificationsEnabled,
        toggleNotifications,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsProvider