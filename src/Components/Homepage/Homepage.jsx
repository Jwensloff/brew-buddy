import './Homepage.scss';
import BreweryContainer from '../BreweryContainer/BreweryContainer';
import Map from '../Map/Map';
import Search from '../Search/Search';

import ErrorPage from '../ErrorPage/ErrorPage';
import { useBreweries } from '../../Context/BreweryContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Homepage() {
  const { error } = useBreweries();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate('/error');
    }
  }, [error]);

  return (
    <>
      <header className='mainHeader'>
        <div className='hero-img'></div>
        <Search />
      </header>
      <main className='homepage'>
        <BreweryContainer />
        <Map />
      </main>
    </>
  );
}

export default Homepage;
