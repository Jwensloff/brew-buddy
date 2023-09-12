import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import ErrorPage from '../ErrorPage/ErrorPage';
import { useEffect, useState } from 'react';
import { BreweryContextProvider } from '../../Context/BreweryContext';
import { FavoriteContextProvider } from '../../Context/FavoriteContext';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import AgeCheck from '../AgeCheck/AgeCheck';

function App() {
  const [isLegal, setisLegal] = useState(() => {
    const legalStatus = localStorage.getItem('isLegal');
    const parsedItem = JSON.parse(legalStatus);
    return parsedItem || '';
  });

  return (
    <BreweryContextProvider>
      <FavoriteContextProvider>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Homepage />
                {!isLegal && (
                  <div className='overlay'>
                    {' '}
                    <AgeCheck setisLegal={setisLegal} />{' '}
                  </div>
                )}
              </>
            }
          />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </FavoriteContextProvider>
    </BreweryContextProvider>
  );
}

export default App;
