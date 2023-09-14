import React, { createContext, useContext, useState } from 'react';
import { getBreweriesByCity, getBreweriesByState } from '../apiCalls';
import PropTypes from 'prop-types';

export const BreweryContext = createContext(null);

export function BreweryContextProvider({ children }) {
  const [breweries, setBreweries] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState('');

  async function obtainBreweries(city, state) {
    let stateBreweryData = [];
    let breweryData = [];
    let filteredBreweryData = [];

    switch (city) {
      case '':
        stateBreweryData = await getBreweriesByState(state);

        if (stateBreweryData.name !== 'Error') {
          setError(false);
          setBreweries(stateBreweryData);
          setNoResults(false);
        }
        // Set error by default
        setError(stateBreweryData.message);

        break;

      default:
        breweryData = await getBreweriesByCity(city);

        if (breweryData.name === 'Error') {
          setError(breweryData.message);
          return;
        }

        setError(false);
        filteredBreweryData = breweryData.filter(
          brewery => brewery.state === state
        );

        if (filteredBreweryData.length === 0) {
          setNoResults(true);
          setBreweries(filteredBreweryData);
        } else {
          setNoResults(false);
          setBreweries(filteredBreweryData);
        }
    }
  }

  return (
    <BreweryContext.Provider
      value={{
        breweries,
        obtainBreweries,
        noResults,
        setNoResults,
        error,
        setError
      }}
    >
      {children}
    </BreweryContext.Provider>
  );
}

export function useBreweries() {
  const breweries = useContext(BreweryContext);
  if (!breweries) {
    throw new Error('useBreweries must be used within BreweryProvider.');
  }
  return breweries;
}
