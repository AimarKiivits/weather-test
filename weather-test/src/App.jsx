import './App.css'
import React, { useState } from 'react'
import { createMockServer } from './mock/createMockServer'
import Search from './components/Search'
import WeatherCard from './components/WeatherCard'


if(process.env.NODE_ENV === 'development') {
  createMockServer()
}

function App() {
  const [selected, setSelected] = useState([])

  const addCity = (city) => {
    setSelected([...selected, city])
}

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <Search selected={selected} useSelected={addCity} />

      <div data-testid='my-weather-list' className='cities-container'>
        {selected && selected.map((city) => 
          <WeatherCard key={`${city.lat}-${city.lon}`} city={city} />
        )}
      </div>
    </div>
  )
}

export default App
