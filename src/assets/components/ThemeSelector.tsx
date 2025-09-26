// components/ThemeSelector.tsx

import React from 'react';
import { useSettings } from '../context/SettingsContext';

const ThemeSelector = () => {
  const { isDarkTheme, toggleTheme } = useSettings();

  return (
  <button
  style={{
    padding: '0.4rem 0.8rem',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#ddd',
    transition: 'background-color 0.2s',
  }}
  onClick={toggleTheme}
>
  {isDarkTheme ? '☀️ Light Mode' : '🌙 Dark Mode'}
</button>

  );
};

export default ThemeSelector;
