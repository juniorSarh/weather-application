import { useState } from 'react';
import WeatherMain from '../components/WeatherMain';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import styles from './Home.module.css';

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className={styles.page}>
      <Header
        onHamburgerClick={() => setDrawerOpen(true)}
        onSearchSubmit={(city) => setSelectedCity(city)}
      />

      <div className={styles.contentArea}>
        <aside className={styles.sidebarDesktop}>
          <Sidebar />
        </aside>

        <main className={styles.mainContent}>
          <WeatherMain externalCity={selectedCity} />
        </main>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className={styles.drawerOverlay} onClick={closeDrawer}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Close menu">×</button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
