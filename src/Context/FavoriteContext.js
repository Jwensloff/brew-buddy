import { createContext, useContext, useState } from 'react';

export const FavoriteContext = createContext(null);

export function FavoriteContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(brewery) {
    if (favorites.includes(brewery)) {
      const arrayoffav = favorites.filter(favBrewery => favBrewery.id !== brewery.id)
      setFavorites(arrayoffav);
    } else {
      setFavorites([...favorites, brewery]);
    }
  }

  const value = {
    favorites,
    toggleFavorite,
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
