import './Homepage.scss';

import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useBreweries } from '../../Context/BreweryContext';

import Map from '../Map/Map';
import BreweryContainer from '../BreweryContainer/BreweryContainer';
import Header from '../Header/Header';

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
      <NavLink to='/favorites'>favorites</NavLink>
      <Header />
      <main className='homepage'>
        <BreweryContainer />
        <Map />
      </main>
    </>
  );
}

export default Homepage;
