import './Homepage.scss';

import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useBreweries } from '../../Context/BreweryContext';
import PropTypes from 'prop-types';

import Map from '../Map/Map';
import BreweryContainer from '../BreweryContainer/BreweryContainer';
import Search from '../Search/Search';
import Header from '../Header/Header';
import ErrorPage from '../ErrorPage/ErrorPage';

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
      <NavLink className='see-all-favorites-btn' to='/favorites'>favorites</NavLink>
      <Header />
      <main className='homepage'>
        <BreweryContainer />
        <Map />
      </main>
    </>
  );
}

Homepage.propTypes = {
  error: PropTypes.string,
};

export default Homepage;
