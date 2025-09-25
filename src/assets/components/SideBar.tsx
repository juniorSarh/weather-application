import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';
import { FaHome, FaMapMarkerAlt, FaCity, FaCog } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.navLink} title="Home">
        <FaHome className={styles.navIcon} />
        <div>Home</div>
      </Link>
      <Link to="/locations" className={styles.navLink} title="Locations">
        <FaMapMarkerAlt className={styles.navIcon} />
        <div>Locations</div>
      </Link>
      <Link to="/cities" className={styles.navLink} title="Cities">
        <FaCity className={styles.navIcon} />
        <div>Cities</div>
      </Link>
      <Link to="/settings" className={styles.navLink} title="Settings">
        <FaCog className={styles.navIcon} />
        <div>Settings</div>
      </Link>
    </div>
  );
};

export default Sidebar;