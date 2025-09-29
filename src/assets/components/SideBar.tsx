
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';
import { useSettings } from '../context/SettingsContext';
import { FaHome, FaMapMarkerAlt, FaCog, FaUser } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const { isDarkTheme } = useSettings();

  return (
    <div className={`${styles.sidebar} ${isDarkTheme ? styles.darkSidebar : ''}`}>
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