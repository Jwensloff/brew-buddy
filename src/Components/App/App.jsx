import './App.scss';
import { BreweryContextProvider } from '../../Context/BreweryContext';
import { FavoriteContextProvider } from '../../Context/FavoriteContext';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Homepage from '../Homepage/Homepage';
import ErrorPage from '../ErrorPage/ErrorPage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import NavBar from '../NavBar/NavBar';
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
          <NavBar />
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
