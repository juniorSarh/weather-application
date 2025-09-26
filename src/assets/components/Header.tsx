import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { WiDaySunny } from 'react-icons/wi';
import ThemeSelector from './ThemeSelector';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Weather Application' }) => {
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  useEffect(() => {
    const savedUnit = localStorage.getItem('unit');
    if (savedUnit === 'fahrenheit') {
      setUnit('fahrenheit');
    }
  }, []);

  const handleUnitChange = (newUnit: 'celsius' | 'fahrenheit') => {
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
    // You can emit this change via props/context if needed elsewhere
  };

  return (
    <header className={styles.header}>
      <WiDaySunny className={styles.icon} />
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.actions}>
        <ThemeSelector />

        <div className={styles.unitButtons}>
          <button
            className={unit === 'celsius' ? styles.activeButton : ''}
            onClick={() => handleUnitChange('celsius')}
          >
            °C
          </button>
          <button
            className={unit === 'fahrenheit' ? styles.activeButton : ''}
            onClick={() => handleUnitChange('fahrenheit')}
          >
            °F
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
