import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import Locations from './assets/pages/Locations'
import Settings from './assets/pages/Settings'

function App() {

  return (
    <>
    <Routes>
    <Route path='' element={<Home/>}/>
  
    <Route path='/locations' element={<Locations/>}/>
    <Route path='/settings' element={<Settings/>}/> 
     </Routes>
    </>
  )
}

export default App
