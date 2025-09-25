import React from 'react'
import WeatherMain from '../components/WeatherMain'
export default function Home() {
  return (
    <div>
      <WeatherMain
  status="Sunny"
  temperature={28}
  day="Monday"
  icon="https://example.com/sunny-icon.png" // or a local icon path
/>
    </div>
  )
}
