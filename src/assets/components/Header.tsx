import React from 'react';
import styles from './Header.module.css';
import { WiDaySunny } from 'react-icons/wi';
import { FiMenu, FiSearch, FiMapPin } from 'react-icons/fi';
import ThemeSelector from './ThemeSelector';
import { useSettings } from '../context/SettingsContext';

interface HeaderProps {
  title?: string;
  onHamburgerClick?: () => void;
  onSearchSubmit?: (city: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title = 'Weather Application', onHamburgerClick, onSearchSubmit }) => {
  const [search, setSearch] = React.useState('');
  const lastCity = typeof window !== 'undefined' ? (localStorage.getItem('lastCity') || '') : '';
  const { unit, setUnit } = useSettings();

  return (
    <header className={styles.header}>
      <button
        className={styles.hamburger}
        onClick={onHamburgerClick}
        aria-label="Open menu"
      >
        <FiMenu />
      </button>

      <div className={styles.brandWrap}>
        <WiDaySunny className={styles.icon} />
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.searchWrap}>
        <FiSearch className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search area here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSearchSubmit) onSearchSubmit(search.trim());
          }}
        />
      </div>

      <div className={styles.actions}>
        <div className={styles.location} title={lastCity || 'No city yet'}>
          <FiMapPin />
          <span>{lastCity || 'Select location'}</span>
        </div>
        <ThemeSelector />

        <div className={styles.unitButtons}>
          <button
            className={unit === 'celsius' ? styles.activeButton : ''}
            onClick={() => setUnit('celsius')}
          >
            °C
          </button>
          <button
            className={unit === 'fahrenheit' ? styles.activeButton : ''}
            onClick={() => setUnit('fahrenheit')}
          >
            °F
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
