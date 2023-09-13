import './Homepage.scss';
import BreweryContainer from '../BreweryContainer/BreweryContainer';
import Map from '../Map/Map';
import Search from '../Search/Search';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
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
      <NavLink className='see-all-favorites-btn' to='/favorites'>
        favorites
      </NavLink>
      <header className='main-header'>
        <Search />
      </header>
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
