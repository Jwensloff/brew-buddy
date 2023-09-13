describe('Error messages should lead the user to enter the correct data', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.intercept(
      'GET', 
      'https://api.openbrewerydb.org/v1/breweries?by_city=San_Diego',
      {statusCode: 200,
      fixture: 'test_city_data.json'}
    ).as('testData')

    cy.intercept(
      'GET', 
      'https://api.openbrewerydb.org/v1/breweries?by_state=California',
      {statusCode: 200,
      fixture: 'test_state_data.json'}
    )
    cy.get('.age-check-wrapper')
    .should('exist')
    .contains('Brew Buddy is for individuals of legal drinking age.');
    cy.get('.yes-button').click();
  })


  it('If a location and State is not entered a message should alert user to enter a location.', () => {
    cy.get('.location-error-message').should('not.exist')
    cy.get('.search-bar').get('#searchBtn').click()
    cy.get('.location-error-message').should('exist').contains('Please specify a location to get started.')
  })

  it('If a State is not selected a message should alert user to select State.', () => {
    cy.get('.location-error-message').should('not.exist')
    cy.get('.search-bar').find('#searchInput').type('San Diego')
    cy.get('.search-bar').find('#searchBtn').click()
    cy.get('.location-error-message').should('exist').contains('Please select a state to get started')
  })

})