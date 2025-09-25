import React from 'react';
import styles from './Footer.module.css';
import { WiCloud } from 'react-icons/wi';

interface FooterProps {
  text?: string;
}

const Footer: React.FC<FooterProps> = ({ text = 'Msunduzi • 22°C • Sunny' }) => {
  return (
    <footer className={styles.footer}>
      <WiCloud className={styles.icon} />
      <p className={styles.text}>{text}</p>
    </footer>
  );
};

export default Footer;