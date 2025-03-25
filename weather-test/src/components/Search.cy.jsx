import React from 'react';
import { mount } from 'cypress/react';
import Search from '../../src/components/Search';

describe('Search Component', () => {
    let useSelected;

    beforeEach(() => {
        useSelected = cy.stub();
        mount(<Search useSelected={useSelected} />);
    });

    it('renders input and button', () => {
        cy.get('[data-testid="search-input"]').should('exist');
        cy.get('[data-testid="search-button"]').should('exist');
    });

    it('updates input value on change', () => {
        cy.get('[data-testid="search-input"]')
            .type('New York')
            .should('have.value', 'New York');
    });

    it('gets search results on button click', () => {
        cy.intercept('GET', 'http://api.openweathermap.org/geo/1.0/direct*', {
            statusCode: 200,
            body: [
                { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 }
            ]
        }).as('getCities');

        cy.get('[data-testid="search-input"]').type('New York');
        cy.get('[data-testid="search-button"]').click();
        cy.wait('@getCities');

        cy.get('[data-testid="search-results"]').should('exist');
        cy.get('.search-result').should('have.length', 1);
    });

    it('calls useSelected when a city is clicked', () => {
        const cities = [
            { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 }
        ];
        
        cy.intercept('GET', 'http://api.openweathermap.org/geo/1.0/direct*', {
            statusCode: 200,
            body: cities
        }).as('getCities');
        
        cy.get('[data-testid="search-input"]').type('New York');
        cy.get('[data-testid="search-button"]').click();
        cy.wait('@getCities');
        
        cy.get('.search-result').click();
        cy.wrap(useSelected).should('have.been.calledWith', cities[0]);
    });
});
