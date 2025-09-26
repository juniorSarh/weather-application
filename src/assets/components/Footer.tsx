import React from 'react';
import styles from './Footer.module.css';
import { WiCloud } from 'react-icons/wi';

interface FooterProps {
  text?: string;
}

const Footer: React.FC<FooterProps> = ({ text = 'Weather App By Royalty Tech.' }) => {
  return (
    <footer className={styles.footer}>
      <WiCloud className={styles.icon} />
      <p className={styles.text}>{text}</p>
    </footer>
  );
};

export default Footer;