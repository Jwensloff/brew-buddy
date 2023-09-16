describe('Error messages should lead the user to enter the correct data', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('.age-check-wrapper')
      .should('exist')
      .contains('Brew Buddy is for individuals of legal drinking age.');
    cy.get('.yes-button').click();
  });

  it('Displays error when form is empty', () => {
    cy.get('.location-error-message').should('not.exist');
    cy.get('.search-bar').get('#searchBtn').click();
    cy.get('.location-error-message')
      .should('exist')
      .contains('Please specify a location to get started.');
  });

  it('Display error when state is missing', () => {
    cy.get('.location-error-message').should('not.exist');
    cy.get('.search-bar').find('#searchInput').type('San Diego');
    cy.get('.search-bar').find('#searchBtn').click();
    cy.get('.location-error-message')
      .should('exist')
      .contains('Please select a state to get started');
  });

  it('Displays error when city is invalid', () => {
    cy.get('#searchInput').type('Santa Cruz!');
    cy.get('#searchBtn').click();

    cy.get('.location-error-message')
      .should('exist')
      .and('contain', 'Please enter a valid city.');
  });

  it('should tell a user if there are no search results that match their input', () => {
    cy.intercept(
      'GET',
      'https://api.openbrewerydb.org/v1/breweries?by_city=San_Diego&per_page=100',
      { statusCode: 200, fixture: 'test_city_data.json' }
    ).as('cityData');
    cy.get('.search-bar').find('#searchInput').type('San Diego');
    cy.get('#dropdown').select('Washington');
    cy.get('.search-bar').find('#searchBtn').click();
    cy.get('.no-results-message').should('exist');
    cy.get('.no-results-message').contains(
      "The beer trail is calling! 🍺 But we might need your help. Check your search and give it another shot."
    );
  });
});
