// components/ThemeSelector.tsx

import { useSettings } from '../context/SettingsContext';

const ThemeSelector = () => {
  const { isDarkTheme, toggleTheme } = useSettings();

  return (
  <button
  style={{
    padding: '0.4rem 0.8rem',
    border: '1px solid var(--border-color)',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    transition: 'background-color 0.2s, color 0.2s',
  }}
  onClick={toggleTheme}
>
  {isDarkTheme ? '☀️ Light Mode' : '🌙 Dark Mode'}
</button>

  );
};

export default ThemeSelector;
