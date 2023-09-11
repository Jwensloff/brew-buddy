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
  // const [isLegal, setisLegal] = useState(false);
  const [isLegal, setisLegal] = useState(() => {
    const legalStatus = localStorage.getItem('isLegal');
    console.log('legalStatus',legalStatus)
    const parsedItem = JSON.parse(legalStatus);
    console.log('parsedItem',parsedItem)
    return parsedItem || '';
  });

  const addFavorites = (newFavorite) => {
    setFavorites([...favorites, newFavorite]);
  };

  // useEffect(() => {
  //   localStorage.setItem('IsLegal', JSON.stringify(false));
  // }, [isLegal]);

  return (
    <BreweryContextProvider>
      <div className='App'>
        {!isLegal && <AgeCheck setisLegal={setisLegal} isLegal={isLegal}/>}
        <header className='mainHeader'>
          <Search />
        </header>

        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    </BreweryContextProvider>
  );
}

export default App;
