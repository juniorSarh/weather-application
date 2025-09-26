import React from 'react';
import styles from './Footer.module.css';
import { WiCloud } from 'react-icons/wi';
import { useSettings } from '../context/SettingsContext';

interface FooterProps {
  text?: string;
}

const Footer: React.FC<FooterProps> = ({ text = 'Weather App By Royalty Tech.' }) => {
  const { isDarkTheme } = useSettings();

  return (
    <footer className={`${styles.footer} ${isDarkTheme ? styles.darkFooter : ''}`}>
      <WiCloud className={styles.icon} />
      <p className={styles.text}>{text}</p>
    </footer>
  );
};

export default Footer;