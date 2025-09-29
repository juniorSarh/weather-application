// src/pages/Locations.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Footer from '../components/Footer';
import SavedLocations from '../components/SavedLocations';
import type { SavedLocation } from '../../types';

import styles from './Locations.module.css'; // Import the CSS module

export default function Locations() {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('savedLocations');
    if (saved) {
      try {
        setSavedLocations(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to load saved locations:', err);
      }
    }
  }, []);

  const handleLocationSelect = (location: SavedLocation) => {
    localStorage.setItem('lastCity', location.name);
    navigate('/'); // Redirect to WeatherHome
  };

  const handleDeleteLocation = (location: SavedLocation) => {
    const updated = savedLocations.filter((loc) => loc.name !== location.name);
    setSavedLocations(updated);
    localStorage.setItem('savedLocations', JSON.stringify(updated));
  };

  return (
    <div>
      <Header />
      <div className={styles.locationsMain}>
    <div className={styles.sidebarWrapper}>
    <Sidebar />
    </div>
   <div className={styles.savedLocationsWrapper}>
    <SavedLocations
      locations={savedLocations}
      onSelect={handleLocationSelect}
      onDelete={handleDeleteLocation}
    />
  </div>
</div>

      <Footer />
    </div>
  );
}
