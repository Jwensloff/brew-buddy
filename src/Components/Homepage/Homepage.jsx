import './Homepage.scss';
import BreweryContainer from '../BreweryContainer/BreweryContainer';
import Map from '../Map/Map';

function Homepage({ breweries }) {
  return (
    <main className='homepage'>
      <BreweryContainer breweries={breweries} />
      <Map />
    </main>
  );
}

export default Homepage;
