/* eslint-disable no-undef */
describe('URL Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/?city=San%20Diego&state=California');
    cy.intercept(
      'GET',
      'https://api.openbrewerydb.org/v1/breweries?by_city=San_Diego&per_page=100',
      { statusCode: 200, fixture: 'test_city_data.json' }
    ).as('cityData');
    cy.intercept(
      'GET',
      'https://api.openbrewerydb.org/v1/breweries?by_state=California&per_page=100',
      { statusCode: 200, fixture: 'test_state_data.json' }
    ).as('stateData');
    cy.intercept(
      'GET',
      'https://api.openbrewerydb.org/v1/breweries?by_state=Minnesota&per_page=100',
      { statusCode: 404 }
    ).as('404Error');
    cy.get('.yes-button').click();
  });

  it('Routes user to URL that reflects search parameters', () => {
    cy.wait('@cityData').then(() => {
      cy.url().should(
        'eq',
        'http://localhost:3000/?city=San%20Diego&state=California'
      );
    });

    cy.get('form').within(() => {
      cy.get('#searchInput').clear();
      cy.get('#searchBtn').click();
    });

    cy.wait('@stateData').then(() => {
      cy.url().should('eq', 'http://localhost:3000/?state=California');
    });
  });

  it('Submits form based on manually entered URL parameters', () => {
    cy.wait('@cityData').then(interception => {
      expect(interception.response.statusCode, 'City data request').to.equal(200);
    });

    cy.get('form').within(() => {
      cy.get('#searchInput').should('have.value', 'San Diego');
      cy.get('#dropdown').should('have.value', 'California');
    });

    cy.get('.brewery-container')
      .find('.brewery-card')
      .first()
      .contains('10 Barrel Brewing Co');
    cy.get('.brewery-container')
      .find('.brewery-card')
      .last()
      .contains('32 North Brewing Co');
  });

  it('User can type in form when URL params exist', () => {
    cy.wait('@cityData').then(() => {
      cy.url().should(
        'eq',
        'http://localhost:3000/?city=San%20Diego&state=California'
      );
    });

    cy.get('#searchInput')
      .clear()
      .type('Santa Cruz')
      .should('have.value', 'Santa Cruz');
  });

  it('Routes user to favorites URL', () => {
    cy.get('.see-all-favorites-btn').click();
    cy.url().should('eq', 'http://localhost:3000/favorites')
  })
  
  it('Routes users back to root URL when "SEARCH" button in header is clicked', () => {
    cy.get('.see-all-favorites-btn').click();
    cy.url().should('eq', 'http://localhost:3000/favorites')
    
    cy.get('.nav-link').contains('search').click();
    cy.url().should('eq', 'http://localhost:3000/')
  })
});
