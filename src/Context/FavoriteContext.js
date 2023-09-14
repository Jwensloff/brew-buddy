import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react';
import { useBreweries } from './BreweryContext';

export const FavoriteContext = createContext(null);

export function FavoriteContextProvider({ children }) {
  const getFavoritesFromLocalStorage = () => {
    const currentFavorites = localStorage.getItem('favorites');
    const parsedData = JSON.parse(currentFavorites);
    return parsedData || [];
  };

  const initialState = {
    favoriteFilter: false,
    favorites: getFavoritesFromLocalStorage(),
    getFilteredBreweries: [],
  };

  const favesReducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_FAVORITE_FILTER':
        return { ...state, favoriteFilter: !state.favoriteFilter };

      case 'ADD_FAVORITE':
        return { ...state, favorites: [...state.favorites, action.brewery] };

      case 'DELETE_FAVORITE':
        const updatedFavorites = state.favorites.filter(
          (favBrewery) => favBrewery.id !== action.brewery.id
        );
        return { ...state, favorites: updatedFavorites };
        
      case 'GET_FAVORITES_BY_LOCATION':
        console.log('HERE----->', breweries)
        const favesByLocation = breweries.filter((brewery) => {
          console.log('inside filter', brewery)
          const favoriteBrewery = state.favorites.find(
            (favorite) => favorite.id === brewery.id
          );
          if (favoriteBrewery) {
            return true;
          }
        });
        console.log('favesByLocation',favesByLocation)
        return { ...state, getFilteredBreweries: favesByLocation };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(favesReducer, initialState);

  const { breweries } = useBreweries();

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const value = {
    favorites: state.favorites,
    toggleFavorite: (brewery) => {
      if (state.favorites.includes(brewery)) {
        dispatch({ type: 'DELETE_FAVORITE', brewery });
      } else {
        dispatch({ type: 'ADD_FAVORITE', brewery });
      }
    },
    toggleFavoritesFilter: () => {
      dispatch({ type: 'TOGGLE_FAVORITE_FILTER' });
    },
    getFilteredBreweries: () => {
      console.log('favorite filter: ',state.favoriteFilter)
      if (state.favoriteFilter) {
        console.log('favorite filter insife if block: ',state.favoriteFilter)
        dispatch({ type: 'GET_FAVORITES_BY_LOCATION' });
      } else {
        return breweries;
      }
    },
    favoriteFilter: state.favoriteFilter,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const favorites = useContext(FavoriteContext);

  if (!favorites) {
    throw new Error('useFavorites must be used within FavoriteContextProvider');
  }

  return favorites;
}
