import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import { useBreweries } from '../../Context/BreweryContext';
import logo from '../../Assets/logo.jpeg';

function NavBar() {
  const { setContextSelected } = useBreweries();

  function resetSelected() {
    setContextSelected();
  }

  return (
    <nav className='nav-bar'>
      <h1>
        <img className='logo' src={logo} alt='Brew Buddy Logo' />
      </h1>
      <NavLink className={'nav-link'} to='/'>
        search
      </NavLink>
      <NavLink
        className='see-all-favorites-btn nav-link'
        onClick={resetSelected}
        to='/favorites'
      >
        favorites
      </NavLink>
    </nav>
  );
}

export default NavBar;
