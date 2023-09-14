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
  // const [favorites, setFavorites] = useState(() => {
  //   const currentFavorites = localStorage.getItem('favorites');
  //   const parsedData = JSON.parse(currentFavorites);
  //   return parsedData || [];
  // });

  const getFavoritesFromLocalStorage = () => {
    const currentFavorites = localStorage.getItem('favorites');
    const parsedData = JSON.parse(currentFavorites);
    return parsedData || [];
  };

  const initialState = {
    favoriteFilter: false,
    favorites: getFavoritesFromLocalStorage(),
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
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(favesReducer, initialState);
  // const [favoriteFilter, setFavoriteFilter] = useState(false);

  const { breweries } = useBreweries();

  function getFilteredBreweries() {
    if (state.favoriteFilter) {
      return breweries.filter((brewery) => state.favorites.includes(brewery));
    } else {
      return breweries;
    }
  }

  // function toggleFavoritesFilter() {
  //   setFavoriteFilter((prevFilter) => !prevFilter);
  // }

  // function toggleFavorite(brewery) {

  // }

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
    getFilteredBreweries,
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
