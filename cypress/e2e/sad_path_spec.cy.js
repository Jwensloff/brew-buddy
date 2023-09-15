describe('Error messages should lead the user to enter the correct data', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('.age-check-wrapper')
      .should('exist')
      .contains('Brew Buddy is for individuals of legal drinking age.');
    cy.get('.yes-button').click();
  });

  it('If a location and State is not entered a message should alert user to enter a location.', () => {
    cy.get('.location-error-message').should('not.exist');
    cy.get('.search-bar').get('#searchBtn').click();
    cy.get('.location-error-message')
      .should('exist')
      .contains('Please specify a location to get started.');
  });

  it('If a State is not selected a message should alert user to select State.', () => {
    cy.get('.location-error-message').should('not.exist');
    cy.get('.search-bar').find('#searchInput').type('San Diego');
    cy.get('.search-bar').find('#searchBtn').click();
    cy.get('.location-error-message')
      .should('exist')
      .contains('Please select a state to get started');
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
      "We're sorry, we didn't find any breweries."
    );
  });
});
