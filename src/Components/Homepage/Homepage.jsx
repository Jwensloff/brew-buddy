import './Homepage.scss';
import BreweryContainer from '../BreweryContainer/BreweryContainer';
import Map from '../Map/Map';
import Search from '../Search/Search';
import { NavLink } from 'react-router-dom';


function Homepage() {
  return (
    <>
      <NavLink to='/favorites'>favorites</NavLink>
      <header className='mainHeader'>
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
