import React from 'react'
import { useState } from 'react';
import SavedLocations from '../components/SavedLocations';
import type { SavedLocation } from '../../types';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Footer from '../components/Footer';

export default function Locations() {
  
const handleLocationSelect = (location: SavedLocation) => {
  console.log("Selected location:", location);
};
return(
    <div>
       <Header/>
      <Sidebar/>
      <SavedLocations onSelect={handleLocationSelect} />
      <Footer/>
    </div>
  )
}
