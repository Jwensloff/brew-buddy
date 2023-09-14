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
  const [favorites, setFavorites] = useState(() => {
    const currentFavorites = localStorage.getItem('favorites');
    const parsedData = JSON.parse(currentFavorites);
    return parsedData || [];
  });

  const initialState = {
    favoriteFilter: false,
  };

  const favesReducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_FAVORITE_FILTER':
        return { ...state, favoriteFilter: !state.favoriteFilter };
    }
  };

  const [state, dispatch] = useReducer(favesReducer, initialState);
  // const [favoriteFilter, setFavoriteFilter] = useState(false);

  const { breweries } = useBreweries();

  function getFilteredBreweries() {
    if (state.favoriteFilter) {
      return breweries.filter((brewery) => favorites.includes(brewery));
    } else {
      return breweries;
    }
  }

  // function toggleFavoritesFilter() {
  //   setFavoriteFilter((prevFilter) => !prevFilter);
  // }

  function toggleFavorite(brewery) {
    if (favorites.includes(brewery)) {
      setFavorites((prev) =>
        prev.filter((favBrewery) => favBrewery.id !== brewery.id)
      );
    } else {
      setFavorites((prev) => [...prev, brewery]);
    }
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const value = {
    favorites,
    toggleFavorite,
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
