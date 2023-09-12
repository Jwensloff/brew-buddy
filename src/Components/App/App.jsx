import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import Search from '../Search/Search';
import ErrorPage from '../ErrorPage/ErrorPage';
import { useEffect, useState } from 'react';
import { BreweryContextProvider } from '../../Context/BreweryContext';
import AgeCheck from '../AgeCheck/AgeCheck';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [isLegal, setisLegal] = useState(() => {
    const legalStatus = localStorage.getItem('isLegal');
    const parsedItem = JSON.parse(legalStatus);
    return parsedItem || '';
  });

  const addFavorites = (newFavorite) => {
    setFavorites([...favorites, newFavorite]);
  };

  return (
    <BreweryContextProvider>
      <div className='App'>
        <header className='mainHeader'>
          <Search />
        </header>

        <Routes>
          <Route
            path='/'
            element={
              <>
                <Homepage />
                {!isLegal && (
                  <div className='overlay'>
                    {' '}
                    <AgeCheck setisLegal={setisLegal}/>{' '}
                  </div>
                )}
              </>
            }
          />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    </BreweryContextProvider>
  );
}

export default App;
