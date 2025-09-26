import React, { useEffect, useState } from 'react';
import type { SavedLocation } from '../../types'; // or wherever it's located

type SavedLocationsProps = {
  onSelect: (location: SavedLocation) => void;
};

const LOCAL_STORAGE_KEY = 'savedLocations';

const SavedLocations: React.FC<SavedLocationsProps> = ({ onSelect }) => {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setSavedLocations(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedLocations));
  }, [savedLocations]);

  const handleLocationSelect = (location: SavedLocation) => {
    onSelect(location);
  };

  const handleLocationDelete = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedLocations(savedLocations.filter(loc => loc.name !== name));
  };

  return (
    <>
      {savedLocations.length > 0 && (
        <div className="saved-locations">
          <h3 className="section-title">Saved Locations</h3>
          <div className="locations-list">
            {savedLocations.map((location, index) => (
              <div
                key={index}
                className="location-card"
                onClick={() => handleLocationSelect(location)}
              >
                <span>{location.name}</span>
                <button
                  className="delete-btn"
                  onClick={(e) => handleLocationDelete(location.name, e)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SavedLocations;
