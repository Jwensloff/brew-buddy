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
  const { breweries } = useBreweries();
  const getFavoritesFromLocalStorage = () => {
    const currentFavorites = localStorage.getItem('favorites');
    const parsedData = JSON.parse(currentFavorites);
    return parsedData || [];
  };

  const initialState = {
    isFaveFilterOn: false,
    favorites: getFavoritesFromLocalStorage(),
    filteredBreweries: [],
  };

  const favesReducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_FAVORITE_FILTER':
        return { ...state, isFaveFilterOn: !state.isFaveFilterOn };

      case 'ADD_FAVORITE':
        return { ...state, favorites: [...state.favorites, action.brewery] };

      case 'DELETE_FAVORITE':
        const updatedFavorites = state.favorites.filter(
          favBrewery => favBrewery.id !== action.brewery.id,
        );
        return { ...state, favorites: updatedFavorites };
      case 'UPDATE_BY_FAVORITES':
           
        const favesByLocation = action.breweries.filter(brewery => {
          const favoriteBrewery = state.favorites.find(
            favorite => favorite.id === brewery.id,
          );
          if (favoriteBrewery) {
            return true;
          }
        });
        return { ...state, filteredBreweries: favesByLocation };
      case 'UPDATE_WITHOUT_FAVORITES':
        return { ...state, filteredBreweries: action.breweries};
      // case 'GET_FAVORITES_BY_LOCATION':
      //   const brewCopy = [...breweries]
      //   const favesByLocation = brewCopy.filter(brewery => {
      //     const favoriteBrewery = state.favorites.find(
      //       favorite => favorite.id === brewery.id,
      //     );
      //     if (favoriteBrewery) {
      //       return true;
      //     }
      //   });
      //   return { ...state, filteredBreweries: favesByLocation };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(favesReducer, initialState);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const value = {
    filteredBreweries: state.filteredBreweries,
    favorites: state.favorites,
    toggleFavorite: brewery => {
      if (state.favorites.includes(brewery)) {
        dispatch({ type: 'DELETE_FAVORITE', brewery });
      } else {
        dispatch({ type: 'ADD_FAVORITE', brewery });
      }
    },
    toggleFavoritesFilter: () => {
      dispatch({ type: 'TOGGLE_FAVORITE_FILTER' });
    },
    updateFilteredBreweries: () => {
      if (state.isFaveFilterOn) {
        dispatch({ type: 'UPDATE_BY_FAVORITES', breweries: breweries});
      } else {
        dispatch({ type: 'UPDATE_WITHOUT_FAVORITES', breweries: breweries });
      }
    },
    isFaveFilterOn: state.isFaveFilterOn,
  };

  useEffect(() => {
    value.updateFilteredBreweries();
  }, [breweries, state.favorites, value.isFaveFilterOn]);

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
