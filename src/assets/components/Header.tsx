import React from 'react';
import styles from './Header.module.css';
import { WiDaySunny } from 'react-icons/wi';
import ThemeSelector from './ThemeSelector';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Weather Application' }) => {
  return (
    <header className={styles.header}>
      <WiDaySunny className={styles.icon} />
      <h1 className={styles.title}>{title}</h1>
      <ThemeSelector/>
    </header>
  );
};

export default Header;