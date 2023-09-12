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

  it('If a location and State is not entered a message should alert user to enter a location.', () => {
    cy.get('.location-error-message').should('not.exist')
    cy.get('.searchBar').find('#searchBtn').click()
    cy.get('.location-error-message').should('exist').contains('Please specify a location to get started.')
  })

  it('If a State is not selected a message should alert user to select State.', () => {
    cy.get('.location-error-message').should('not.exist')
    cy.get('.searchBar').find('#searchInput').type('San Diego')
    cy.get('.searchBar').find('#searchBtn').click()
    cy.get('.location-error-message').should('exist').contains('Please select a state to get started')
  })


  it('Should be able to search breweries and cards appear.', () => {
    cy.get('.searchBar').find('#searchInput').type('San Diego')
    cy.get('.searchBar').find('#dropdown').select('California')
    cy.get('.searchBar').find('#searchBtn').click()
    cy.get('.breweryContainer').find('.breweryCard').first().contains('10 Barrel Brewing Co')
  })

  it('Should should be able to search by State.', () => {
    cy.get('.searchBar').find('#dropdown').select('California')
    cy.get('.searchBar').find('#searchBtn').click()
    cy.get('.breweryContainer').find('.breweryCard').last().contains('32 North Brewing Co')
  })

  it('should to able to toggle local favorites filter', () => {
    cy.get('.searchBar').find('#searchInput').type('San Diego');
    cy.get('.searchBar').find('#dropdown').select('California');
    cy.get('.searchBar').find('#searchBtn').click();
    cy.get('.breweryCard').should('have.length', 3)
    cy.get('.breweryCard').contains('2Kids Brewing Company');
    cy.get('.breweryCard').first().find('.breweryCard-favorites-btn').click();
    cy.get('.breweryCard').last().find('.breweryCard-favorites-btn').click();
    cy.get('.filter-btn').click()
    cy.get('.breweryCard').should('have.length', 2)
    cy.get('.breweryCard').should('not.contain', '2Kids Brewing Company');
    cy.get('.filter-btn').click()
    cy.get('.breweryCard').should('have.length', 3)
    cy.get('.breweryCard').contains('2Kids Brewing Company');
    cy.get('.breweryCard').first().find('.breweryCard-favorites-btn');
  });
})