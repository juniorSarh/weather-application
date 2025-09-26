import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/SideBar'
import Footer from '../components/Footer'
import SettingsCard from '../components/SettingsCard'

export default function Settings() {
  return (
    <div>
      <Header/>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
      <Sidebar/>
      <SettingsCard/>
      </div>
      <Footer/>
    </div>
  )
}
