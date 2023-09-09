import React, { createContext, useContext, useState } from 'react';
import { getBreweries, getBreweriesByState } from '../apiCalls';

export const BreweryContext = createContext(null);

export function BreweryContextProvider({ children }) {
  const [breweries, setBreweries] = useState([]);
  const [noResults, setNoResults]= useState(false);

  async function obtainBreweries(city, state) {
    console.log('city', city);
    console.log('state', state);
    let stateBreweryDate = [];
    let breweryData = [];
    let filteredBreweryData = [];
    if (!city) {
      stateBreweryDate = await getBreweriesByState(state);
      setBreweries(stateBreweryDate);
      setNoResults(false)
    } else {
      breweryData = await getBreweries(city);
      filteredBreweryData = breweryData.filter(
        (brewery) => brewery.state === state
      );
      if(filteredBreweryData.length === 0){
        setNoResults(true)
        setBreweries(filteredBreweryData)
      } else {
        setNoResults(false)
        setBreweries(filteredBreweryData)
      }
    }

  }

  return (
    <BreweryContext.Provider value={{ breweries, obtainBreweries, noResults, setNoResults }}>
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
