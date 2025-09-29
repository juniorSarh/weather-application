// components/SavedLocations.tsx
import type { SavedLocation } from '../../types';
import styles from './SavedLocations.module.css'; // Styling we'll create below

export type SavedLocationsProps = {
  locations: SavedLocation[];
  onSelect: (location: SavedLocation) => void;
  onDelete: (location: SavedLocation) => void;
};

export default function SavedLocations({ locations, onSelect, onDelete }: SavedLocationsProps) {
  if (!locations.length) {
    return <p className={styles.empty}>No saved locations.</p>;
  }

  return (
    <div className={styles.container}>
      {locations.map((location) => (
        <div key={location.name} className={styles.card}>
          <h3 className={styles.cityName}>{location.name}</h3>
          <div className={styles.actions}>
            <button className={styles.viewButton} onClick={() => onSelect(location)}>
              View
            </button>
            <button className={styles.deleteButton} onClick={() => onDelete(location)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
