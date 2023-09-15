import { createContext, useContext, useState, useReducer } from 'react';
import { getBreweriesByCity, getBreweriesByState } from '../apiCalls';
import PropTypes from 'prop-types';

export const BreweryContext = createContext(null);

export function BreweryContextProvider({ children }) {
  const initialState = {
    selectedBrewery: '',
    isSelected: false
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

  // const [selectedBrewery, setSelectedBrewery] = useState({});
  // const [isSelected, setIsSelected] = useState(false)

  async function obtainBreweries(city, state) {
    let stateBreweryData = [];
    let breweryData = [];
    let filteredBreweryData = [];

    switch (city) {
      case '':
        stateBreweryData = await getBreweriesByState(state);

        if (stateBreweryData.name !== 'Error') {
          let onlyCoordsData = stateBreweryData.filter(
            brewery => brewery.longitude && brewery.latitude
          );
          setError(false);
          setBreweries(onlyCoordsData);
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
          brewery =>
            brewery.state === state && brewery.latitude && brewery.longitude
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

  // function setContextSelected(id){

  // setSelectedBrewery(id);
  // setIsSelected(true);
  // }

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
    }
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
