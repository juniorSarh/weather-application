import React from 'react'
import WeatherMain from '../components/WeatherMain'
import { FaSun } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Header/>
     <WeatherMain />
     <Footer/>
    </div>
  )
}
