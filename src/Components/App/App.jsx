import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import Search from '../Search/Search';
import { useState } from 'react';
import { BreweryContextProvider } from '../../Context/BreweryContext';
import { FavoriteContextProvider } from '../../Context/FavoriteContext';

function App() {
  const [favorites, setFavorites] = useState([]);

  const addFavorites = newFavorite => {
    setFavorites([...favorites, newFavorite]);
  };

  return (
    <BreweryContextProvider>
      <FavoriteContextProvider>
        <div className='App'>
          <header className='mainHeader'>
            <Search />
          </header>

          <Routes>
            <Route path='/' element={<Homepage />} />
          </Routes>
        </div>
      </FavoriteContextProvider>
    </BreweryContextProvider>
  );
}

export default App;
