import './Homepage.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreweries } from '../../Context/BreweryContext';
import PropTypes from 'prop-types';
import Map from '../Map/Map';
import BreweryContainer from '../BreweryContainer/BreweryContainer';
import Header from '../Header/Header';

function Homepage() {
  const { error, getUserLocation, obtainBreweries, userLocation} = useBreweries();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate('/error');
    }
  }, [error]);

  useEffect(() => {
   getUserLocation()
  }, [])

  return (
    <>
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
