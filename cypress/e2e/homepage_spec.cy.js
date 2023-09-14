describe('Legal drinking age modal appears when a user first visits site', () => {
  it('should ask a user it they are over 21', () => {
    cy.visit('http://localhost:3000');
    cy.get('.overlay').should('exist');
    cy.get('.age-check-wrapper').should('exist').contains('Are you 21?');
    cy.get('.age-check-wrapper')
      .should('exist')
      .contains('Brew Buddy is for individuals of legal drinking age.');
    cy.get('.yes-button').click();
    cy.get('.homepage').should('exist');
    cy.get('.brewery-container').contains('Search Results Will Appear Here');
    cy.get('.leaflet-container').should('exist');
  });
});

describe('homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept(
      'GET',
      'https://api.openbrewerydb.org/v1/breweries?by_city=San_Diego',
      { statusCode: 200, fixture: 'test_city_data.json' }
    ).as('cityData');

    cy.intercept(
      'GET',
      'https://api.openbrewerydb.org/v1/breweries?by_state=California',
      { statusCode: 200, fixture: 'test_state_data.json' }
    ).as('stateData');
    
    cy.get('.age-check-wrapper')
    .should('exist')
    .contains('Brew Buddy is for individuals of legal drinking age.');
    cy.get('.yes-button').click();
  });
  
  it('Should be able to search breweries by city AND state', () => {
    cy.get('.search-bar').get("input[name='city']").type('San Diego');
    cy.get("input[name='city']").should('have.value', 'San Diego');
    cy.get('.search-bar').find('#dropdown').select('California');
    cy.get('.search-bar').find('#searchBtn').click();
    cy.wait('@cityData')
    cy.get('.brewery-card').should('have.length', 3)
    cy.get('.brewery-container')
    .find('.brewery-card')
    .first()
    .contains('10 Barrel Brewing Co');
    cy.get('.brewery-container')
    .find('.brewery-card')
    .last()
    .contains('32 North Brewing Co');
    cy.get('.search-bar').get("input[name='city']").clear();
    cy.get('.search-bar').find('#dropdown').select('California');
    cy.get('#dropdown').should('have.value', 'California');
    cy.get('.search-bar').find('#searchBtn').click();
    cy.wait('@stateData')
    cy.get('.brewery-card').should('have.length', 3)
    cy.get('.brewery-container')
    .find('.brewery-card')
    .last()
    .contains('Firestone Walker Brewing Company');
  });
  
  it('should allow a user to favorite a brewery and view list of favorites', () => {
    cy.get('.filter-btn').should('exist')
    cy.get('.see-all-favorites-btn').should('exist')
    cy.get('.search-bar').find('#dropdown').select('California')
    cy.get('.search-bar').find('#searchBtn').click()
    cy.wait('@stateData')
    cy.get('.brewery-card').should('have.length', 3)
    cy.get('.brewery-card').get('#1').find('.brewery-card-favorites-btn').click()
    cy.get('.brewery-card').get('#3').find('.brewery-card-favorites-btn').click()
    cy.get('.filter-btn').click()
    cy.get('.brewery-card').should('have.length', 2)
    cy.get('.brewery-card').get('#1').find('.brewery-card-favorites-btn').click()
    cy.get('.brewery-card').should('have.length', 1)
    cy.get('.see-all-favorites-btn').click()
    cy.get('.brewery-card').should('have.length', 1)
  })
});
