import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import Search from '../Search/Search';
import { useState } from 'react';
import { BreweryContextProvider } from '../../Context/BreweryContext';

function App() {
  const [favorites, setFavorites] = useState([]);

  const addFavorites = (newFavorite) => {
    setFavorites([...favorites, newFavorite]);
  };

  return (
    <BreweryContextProvider >
        <div className='App'>
          <header className='mainHeader'>
            <Search /> 
          </header>

          <Routes>
            <Route path='/' element={<Homepage/>} />
          </Routes>
        </div>
    </BreweryContextProvider>
  );
}

export default App;
