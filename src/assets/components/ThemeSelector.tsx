import React, { useEffect, useState } from 'react';

const ThemeSelector = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // On load, apply saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDarkTheme(useDark);
    document.body.classList.toggle('dark-theme', useDark);
  }, []);

  // When toggled, update class and localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.body.classList.toggle('dark-theme', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDarkTheme ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeSelector;
