describe('Weather App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('renders the app title', () => {
        cy.contains('h1', 'Weather App').should('be.visible');
    });

    it('search for a city', () => {
        cy.contains('Weather App')
        cy.get('[data-testid="search-input"]').type('Melbourne');
        cy.contains('Search').click();
        cy.get('[data-testid="search-results"] .search-result').should('have.length', 5);
    });

    it('add a city to the list and displays correct data', () => {
        cy.get('[data-testid="search-input"]').type('Melbourne');
        cy.contains('Search').click();
        cy.get('[data-testid="search-results"] .search-result').first().click();
        cy.get('[data-testid="my-weather-list"]').should('have.length', 1);
        cy.get('.weather-container .temperature').should('have.text', '14.93');
        cy.get('.weather-container .weather-catagory').should('have.text', 'Clouds');
    });
});