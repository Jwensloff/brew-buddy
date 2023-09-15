import { createContext, useContext, useState, useReducer } from 'react';
import { getBreweriesByCity, getBreweriesByState } from '../apiCalls';
import PropTypes from 'prop-types';

export const BreweryContext = createContext(null);

export function BreweryContextProvider({ children }) {
  const initialState = {
    selectedBrewery: '',
    isSelected: false,
    breweries: [],
  };

  const breweryReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SELECTED_BREWERY':
        return { ...state, selectedBrewery: action.id, isSelected: true };
      case 'SET_IS_SELECTED':
        return { ...state, isSelected: action.status };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(breweryReducer, initialState);

  const [breweries, setBreweries] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState('');

  function cleanData(data, city, state) {
    const validData = data.filter(
      brewery => brewery.latitude && brewery.longitude,
    );

    if (city) {
      validData = validData.filter(brewery => brewery.state === state);
    }

    return validData;
  }

  function processData(data) {
    setError(false);
    const noResults = data.length ? true : false;
    setNoResults(noResults);
    setBreweries(data);
  }


  async function obtainBreweries(city, state) {
    let breweryData = [];

    if (!city) {
      breweryData = await getBreweriesByState(state);
    } else {
      breweryData = await getBreweriesByCity(city);
    }

    const cleanedData = cleanData(breweryData, city, state);
    processData(cleanedData);
  }

  
  const value = {
    breweries,
    obtainBreweries,
    noResults,
    setNoResults,
    isSelected: state.isSelected,
    selectedBrewery: state.selectedBrewery,
    error,
    setIsSelected: status => {
      dispatch({ type: 'SET_IS_SELECTED', status });
    },
    setBreweries,
    setContextSelected: id => {
      dispatch({ type: 'SET_SELECTED_BREWERY', id });
    },
  };

  return (
    <BreweryContext.Provider value={value}>{children}</BreweryContext.Provider>
  );
}

export function useBreweries() {
  const breweries = useContext(BreweryContext);
  if (!breweries) {
    throw new Error('useBreweries must be used within BreweryProvider.');
  }
  return breweries;
}
