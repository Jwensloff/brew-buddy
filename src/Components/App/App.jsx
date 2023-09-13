import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from '../Homepage/Homepage';
import ErrorPage from '../ErrorPage/ErrorPage';
import { useState } from 'react';
import { BreweryContextProvider } from '../../Context/BreweryContext';
import { FavoriteContextProvider } from '../../Context/FavoriteContext';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import NavBar from '../NavBar/NavBar';

function App() {

  return (
    <BreweryContextProvider>
      <FavoriteContextProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
            <Route path='/error' element={<ErrorPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
      </FavoriteContextProvider>
    </BreweryContextProvider>
  );
}

export default App;
