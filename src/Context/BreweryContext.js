import { createContext, useContext, useState, useReducer } from 'react';
import { getBreweriesByCity, getBreweriesByState } from '../apiCalls';
import PropTypes from 'prop-types';

export const BreweryContext = createContext(null);

export function BreweryContextProvider({ children }) {
  const initialState = {
    selectedBrewery: '',
    isSelected: false,
    breweries: [],
    noResults: false,
    error: ''
  };

  const breweryReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SELECTED_BREWERY':
        if(action.id){
        return { ...state, selectedBrewery: action.id, isSelected: true };}
        else {
          return {...state, selectedBrewery: '', isSelected: false};
        }
      case 'SET_IS_SELECTED':
        return { ...state, isSelected: action.status };
      case 'SET_BREWERIES':
        const noResults = !action.breweries.length;   
        return { ...state, breweries: action.breweries, noResults: noResults };
      case 'SET_ERROR':
        return {...state, error: action.error}
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(breweryReducer, initialState);

  function cleanData(data, city, state) {
    let validData = data.filter(
      brewery => brewery.latitude && brewery.longitude,
    );

    if (city) {
      validData = validData.filter(brewery => brewery.state === state);
    }

    dispatch({ type: 'SET_BREWERIES', breweries: validData});

  }

  async function obtainBreweries(city, state) {
    let breweryData = [];
    if (!city) {
      breweryData = await getBreweriesByState(state);
    } else {
      breweryData = await getBreweriesByCity(city);
    }
    
    const isError = breweryData.name === 'Error';  
    dispatch({type: 'SET_ERROR', error: isError}) 
    if (isError) {
      return
    }

    cleanData(breweryData, city, state);
  }

  const value = {
    breweries: state.breweries,
    obtainBreweries,
    noResults: state.noResults,
    isSelected: state.isSelected,
    selectedBrewery: state.selectedBrewery,
    error: state.error,
    setIsSelected: status => {
      dispatch({ type: 'SET_IS_SELECTED', status });
    },
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
