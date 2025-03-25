import React from 'react';
import { mount } from 'cypress/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard Component', () => {
    const city = { name: 'London' };

    beforeEach(() => {
        cy.intercept('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London', {
            statusCode: 200,
            body: {
                main: { temp: 15 },
                weather: [{ main: 'Cloudy' }]
            }
        }).as('getWeather');
        
        mount(<WeatherCard city={city} />);
    });

    it('renders city name', () => {
        cy.contains('h3', 'London').should('exist');
    });

    it('fetches and displays weather data', () => {
        cy.wait('@getWeather');
        cy.get('.temperature').should('contain', '15');
        cy.get('.weather-catagory').should('contain', 'Cloudy');
    });

    it('displays default values before data loads', () => {
        cy.get('.temperature').should('contain', '-/-');
    });
});
