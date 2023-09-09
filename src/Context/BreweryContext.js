import React, { createContext, useContext, useState } from 'react';
import { getBreweries, getBreweriesByState } from '../apiCalls';

export const BreweryContext = createContext(null);

export function BreweryContextProvider({ children }) {
  const [breweries, setBreweries] = useState([]);

  async function obtainBreweries(city, state) {
    console.log('city', city);
    console.log('state', state);
    let stateBreweryDate = [];
    let breweryData = [];
    let filteredBreweryData = [];
    if (!city) {
      stateBreweryDate = await getBreweriesByState(state);
      setBreweries(stateBreweryDate);
    } else {
      breweryData = await getBreweries(city);
      filteredBreweryData = breweryData.filter(
        (brewery) => brewery.state === state
      );
      setBreweries(filteredBreweryData);
    }
  }

  return (
    <BreweryContext.Provider value={{ breweries, obtainBreweries }}>
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
