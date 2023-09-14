import React, { createContext, useContext, useState } from 'react';
import { getBreweries, getBreweriesByState } from '../apiCalls';

export const BreweryContext = createContext(null);

export function BreweryContextProvider({ children }) {
  const [breweries, setBreweries] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState('');
  const [selectedBrewery, setSelectedBrewery] = useState(''); 
  const [isSelected, setIsSelected] = useState(false)

  async function obtainBreweries(city, state) {
    let stateBreweryData = [];
    let breweryData = [];
    let filteredBreweryData = [];

    if (!city) {
      stateBreweryData = await getBreweriesByState(state);
      if (stateBreweryData.message === 'Custom error for now') {
        setError(stateBreweryData.message);
        return;
      }
      let onlyCoordsData = stateBreweryData.filter(brewery => brewery.longitude && brewery.latitude)
      setError(false);
      setBreweries(onlyCoordsData);
      setNoResults(false);
    } else {
      breweryData = await getBreweries(city);
      if (breweryData.message === 'Custom error for now') {
        setError(breweryData.message);
        return;
      }
      setError(false);
      filteredBreweryData = breweryData.filter(
        (brewery) => brewery.state === state && brewery.latitude && brewery.longitude
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

  function setContextSelected(id){
    setSelectedBrewery(id);
    setIsSelected(true);
  }

  return (
    <BreweryContext.Provider
      value={{ breweries, obtainBreweries, noResults, setNoResults, error, setBreweries, isSelected, setIsSelected, selectedBrewery, setSelectedBrewery, setContextSelected}}
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
