import './Homepage.scss';

import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Map from '../Map/Map';
import BreweryContainer from '../BreweryContainer/BreweryContainer';
import Header from '../Header/Header';
import { useBreweries } from '../../Context/BreweryContext';

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
