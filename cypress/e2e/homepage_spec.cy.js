describe('homepage', () => {
  
  beforeEach(() => {
    cy.intercept(
      'GET', 
      'https://api.openbrewerydb.org/v1/breweries?by_city=${Butte}',
      {statusCode: 200,
      fixture: 'test_brewery_data.json'}
    ).as('testData')
  })

  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

})