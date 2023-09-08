import './Homepage.scss';
import BreweryContainer from '../BreweryContainer/BreweryContainer';
import Map from '../Map/Map';

function Homepage() {
  return (
    <main className='homepage'>
      <BreweryContainer />
      <Map />
    </main>
  );
}

export default Homepage;
