describe('homepage', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.intercept(
      'GET', 
      'https://api.openbrewerydb.org/v1/breweries?by_city=San_Diego',
      {statusCode: 200,
      fixture: 'test_brewery_data.json'}
    ).as('testData')

    cy.intercept(
      'GET', 
      'https://api.openbrewerydb.org/v1/breweries?by_state=California',
      {statusCode: 200,
      fixture: 'test_state_data.json'}
    )
  })

  it('should ask a user it they are over 21', () => {
    cy.get('.overlay').should('exist')
    cy.get('.age-check-wrapper').should('exist').contains('Are you 21?')
    cy.get('.age-check-wrapper').should('exist').contains('Brew Buddy is for individuals of legal drinking age.')
    cy.get('.yes-button').click()
    cy.get('.homepage').should('exist')
    cy.get('.brewery-container').contains('Search Results Will Appear Here')
    cy.get('.leaflet-container').should('exist')
  })

  it('If a location and State is not entered a message should alert user to enter a location.', () => {
    cy.get('.location-error-message').should('not.exist')
    cy.get('.search-bar').get('#searchBtn').click()
    cy.get('.location-error-message').should('exist').contains('Please specify a location to get started.')
  })

  it.skip('If a State is not selected a message should alert user to select State.', () => {
    cy.get('.location-error-message').should('not.exist')
    cy.get('.searchBar').find('#searchInput').type('San Diego')
    cy.get('.searchBar').find('#searchBtn').click()
    cy.get('.location-error-message').should('exist').contains('Please select a state to get started')
  })


  it.skip('Should be able to search breweries and cards appear.', () => {
    cy.get('.searchBar').find('#searchInput').type('San Diego')
    cy.get('.searchBar').find('#dropdown').select('California')
    cy.get('.searchBar').find('#searchBtn').click()
    cy.get('.breweryContainer').find('.breweryCard').first().contains('10 Barrel Brewing Co')
  })

  



})