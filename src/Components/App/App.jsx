import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import { useState } from 'react';
import { BreweryContextProvider } from '../../Context/BreweryContext';
import { FavoriteContextProvider } from '../../Context/FavoriteContext';
import FavoritesPage from '../FavoritesPage/FavoritesPage';

function App() {
  const [favorites, setFavorites] = useState([]);

  const addFavorites = newFavorite => {
    setFavorites([...favorites, newFavorite]);
  };

  return (
    <BreweryContextProvider>
      <FavoriteContextProvider>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
        </Routes>
      </FavoriteContextProvider>
    </BreweryContextProvider>
  );
}

export default App;
