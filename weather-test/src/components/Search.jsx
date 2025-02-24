import React from 'react';
import { useState } from 'react';
import './Search.css'

const Search = ({ useSelected }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const inputChangeHandler = (e) => {
        setQuery(e.target.value)
    }

    const buttonClickHandler = async () => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`)
            .then((result) => {
                return result.json()
            })
            .then((cities) => {
                setResults(cities.map((city) => ({
                    name: city.name,
                    country: city.country,
                    lat: city.lat,
                    lon: city.lon
                })))
            })
    }

    const selectCity = (city) => {
        useSelected(city)
        setResults([])
    }

    return (
        <div className='search-container'>
            <div className='input-container'>
                <input type='text' data-testid='search-input' onChange={inputChangeHandler} />
                <button data-testid='search-button' onClick={buttonClickHandler}>Search</button>
            </div>

            {
            results.length > 0 &&
                <div data-testid='search-results' className='search-results'>
                    {results.map((city) =>
                    <div 
                        className='search-result'
                        key={`${city.lat}-${city.lon}`}
                        onClick={() => selectCity(city)}>
                        <span className='city-name'>{city.name}</span>
                        <span className='city-location'>{city.lat}, {city.lon}</span>
                    </div>)}
                </div>
            }
        </div>
    )
}

export default Search;