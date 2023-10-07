import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react';
import {
  getBreweriesByCity,
  getBreweriesByCoords,
  getBreweriesByState,
} from '../apiCalls';
import PropTypes from 'prop-types';

export const BreweryContext = createContext(null);

export function BreweryContextProvider({ children }) {
  const initialState = {
    selectedBrewery: '',
    isSelected: false,
    breweries: [],
    noResults: false,
    error: '',
    userLocation: [],
    locationError: '',
    locationPermission: false,
    showDistance: false,
  };

  const breweryReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SELECTED_BREWERY':
        if (action.id) {
          return { ...state, selectedBrewery: action.id, isSelected: true };
        } else {
          return { ...state, selectedBrewery: '', isSelected: false };
        }
      case 'SET_IS_SELECTED':
        return { ...state, isSelected: action.status };
      case 'SET_BREWERIES':
        const noResults = !action.breweries.length;
        return { ...state, breweries: action.breweries, noResults: noResults };
      case 'SET_ERROR':
        return { ...state, error: action.error };
      case 'SET_USER_LOCATION':
        return { ...state, userLocation: action.userLocation };
      case 'SET_USER_LOCATION_ERROR':
        return { ...state, userLocationError: action.error };
      case 'SET_LOCATION_PERMISSION': 
        return { ...state, locationPermission: action.status};
      case 'SET_DISTANCE_ON':
      return {...state, showDistance: action.status};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(breweryReducer, initialState);

  function cleanData(data, city, state) {
    let validData = data.filter(
      brewery => brewery.latitude && brewery.longitude,
    ).filter(brewery => brewery.brewery_type !== 'closed')

    if (city) {
      validData = validData.filter(brewery => brewery.state === state);
    }

    dispatch({ type: 'SET_BREWERIES', breweries: validData });
  }

  async function obtainBreweries(city, state, coords) {
    let breweryData = [];
    if (coords) {
      breweryData = await getBreweriesByCoords(coords);
    } else if (!city) {
      breweryData = await getBreweriesByState(state);
    } else {
      breweryData = await getBreweriesByCity(city);
    }

    const isError = breweryData.name === 'Error';
    dispatch({ type: 'SET_ERROR', error: breweryData.message });
    if (isError) {
      return;
    }

    cleanData(breweryData, city, state);
  }

  async function getUserLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        location => {
          dispatch({
            type: 'SET_USER_LOCATION',
            userLocation: [location.coords.latitude, location.coords.longitude],
          });
          return [location.coords.latitude, location.coords.longitude];
        },
        error => {
          dispatch({
            type: 'SET_USER_LOCATION_ERROR',
            error:
              "Oops! We couldn't find your location. Try searching by city instead.",
          });
        },
      );
    });
  }

  useEffect(() => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(permissionStatus => {
        dispatch({type: 'SET_LOCATION_PERMISSION', status: permissionStatus.state})
        permissionStatus.onchange = () => {
          dispatch({type: 'SET_LOCATION_PERMISSION', status: permissionStatus.state})
          if (permissionStatus.state === 'granted') {
            getUserLocation();
          } else  {
            dispatch({type: 'SET_USER_LOCATION', userLocation: [] })
          }
        };
      });

        getUserLocation();
  }, []);

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
    userLocation: state.userLocation,
    getUserLocation,
    setDistanceOn: status => {
      dispatch({ type: 'SET_DISTANCE_ON', status });
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
