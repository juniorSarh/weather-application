// context/SettingsContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';

type UnitType = 'celsius' | 'fahrenheit';

interface SettingsContextProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  unit: UnitType;
  setUnit: (unit: UnitType) => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

 const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [unit, setUnit] = useState<UnitType>('celsius');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // On load, check theme and units
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDarkTheme(useDark);
    document.body.classList.toggle('dark-theme', useDark);

    const savedUnit = localStorage.getItem('unit') as UnitType;
    if (savedUnit === 'fahrenheit' || savedUnit === 'celsius') {
      setUnit(savedUnit);
    }

    const savedNotifications = localStorage.getItem('notificationsEnabled');
    setNotificationsEnabled(savedNotifications !== 'false');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.body.classList.toggle('dark-theme', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleNotifications = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem('notificationsEnabled', String(newValue));
  };

  const updateUnit = (newUnit: UnitType) => {
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
  };

  return (
    <SettingsContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        unit,
        setUnit: updateUnit,
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