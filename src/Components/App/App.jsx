import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import Search from '../Search/Search';
import ErrorPage from '../ErrorPage/ErrorPage';
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
        <div className='App'>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/error' element={<ErrorPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </FavoriteContextProvider>
    </BreweryContextProvider>
  );
}

export default App;
