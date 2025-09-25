import React from 'react';

// Define the props interface
interface WeatherProps {
  status: string;       // e.g., "Sunny", "Cloudy"
  temperature: number;  // in degrees, e.g., 25
  day: string;          // e.g., "Monday"
  icon: string;         // URL or icon name
}

const WeatherMain: React.FC<WeatherProps> = ({ status, temperature, day, icon }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: '#f0f0f0',
      maxWidth: '300px'
    }}>
      {/* Weather Icon */}
      <img src={icon} alt={status} style={{ width: '50px', height: '50px', marginRight: '16px' }} />

      {/* Weather Details */}
      <div>
        <h2 style={{ margin: 0, fontSize: '1.5em' }}>{day}</h2>
        <p style={{ margin: '4px 0', fontSize: '1.2em' }}>{status}</p>
        <p style={{ margin: 0, fontSize: '1.2em' }}>{temperature}°</p>
      </div>
    </div>
  );
};

export default WeatherMain;