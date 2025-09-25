import React from 'react';
import { Link } from 'react-router-dom';
// Import icons from react-icons
import { FaHome, FaMapMarkerAlt, FaCity, FaCog, FaSun } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const linkStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2px',
    textDecoration: 'none',
    color: 'black',
    width: '350px',
    marginBottom: '10px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  };

  return (
    <div style={{
      width: '350px',
      padding: '20px',
      borderRight: '1px solid #ccccccff',
      backgroundColor: 'skyblue',
      height: '80vh',
      boxSizing: 'border-box',
      margin:'2px'
    }}>
      <Link to="/" style={linkStyle} title="Home" onMouseOver={e => (e.currentTarget.style.backgroundColor = '#f0f0f0')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '')}>
        <FaHome size={24} />
        <div>Home</div>
      </Link>
      <Link to="/locations" style={linkStyle} title="Locations" onMouseOver={e => (e.currentTarget.style.backgroundColor = '#f0f0f0')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '')}>
        <FaMapMarkerAlt size={24} />
        <div>Locations</div>
      </Link>
      <Link to="/cities" style={linkStyle} title="Cities" onMouseOver={e => (e.currentTarget.style.backgroundColor = '#f0f0f0')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '')}>
        <FaCity size={24} />
        <div>Cities</div>
      </Link>
      <Link to="/settings" style={linkStyle} title="Settings" onMouseOver={e => (e.currentTarget.style.backgroundColor = '#f0f0f0')} onMouseOut={e => (e.currentTarget.style.backgroundColor = '')}>
        <FaCog size={24} />
        <div>Settings</div>
      </Link>
    </div>
  );
};

export default Sidebar;