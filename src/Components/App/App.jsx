import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import Search from '../Search/Search';
import { useState } from 'react';
import FavoriteContext from '../Context/FavoriteContext';
import { BreweryContext } from '../Context/BreweryContext';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addFavorites = (newFavorite) => {
    setFavorites([...favorites, newFavorite]);
  };

  return (
    <BreweryContext.Provider value={breweries}>
      <FavoriteContext.Provider value={favorites}>
        <div className='App'>
          <header className='mainHeader'>
            <Search setBreweries={setBreweries} />
          </header>

          <Routes>
            <Route path='/' element={<Homepage/>} />
          </Routes>
        </div>
      </FavoriteContext.Provider>
    </BreweryContext.Provider>
  );
}

export default App;
