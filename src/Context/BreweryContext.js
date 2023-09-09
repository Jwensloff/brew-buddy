import React, { createContext, useContext, useState } from 'react';
import getBreweries from '../apiCalls';

export const BreweryContext = createContext(null);

export function BreweryContextProvider({ children }) {
  const [breweries, setBreweries] = useState([]);

  async function obtainBreweries(city, state) {
    const breweryData = await getBreweries(city);
    const filteredBreweryData = breweryData.filter(brewery => brewery.state === state)
    console.log('filtered',filteredBreweryData)
    setBreweries(filteredBreweryData);
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
