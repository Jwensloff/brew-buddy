import './Homepage.scss';
import BreweryContainer from '../BreweryContainer/BreweryContainer';
import Map from '../Map/Map';
import ErrorPage from '../ErrorPage/ErrorPage';
import { useBreweries } from '../../Context/BreweryContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Homepage() {
  const { error } = useBreweries();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('error', error);
    if (error) {
      navigate('/error');
    }
  }, [error]);

  return (
    <>
      {error ? (
        <ErrorPage />
      ) : (
        <main className='homepage'>
          <BreweryContainer />
          <Map />
        </main>
      )}
    </>
  );
}

export default Homepage;
