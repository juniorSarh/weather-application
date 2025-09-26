import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';
import { FaHome, FaMapMarkerAlt, FaCog } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';

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
      <Link to="/settings" className={styles.navLink} title="Settings">
        <FaCog className={styles.navIcon} />
        <div>Settings</div>
      </Link>
      <Link to="/user" className={styles.navLink} title="Users">
        <FaUser className={styles.navIcon} />
        <div>Profile</div>
      </Link>
    </div>
  );
};

export default Sidebar;