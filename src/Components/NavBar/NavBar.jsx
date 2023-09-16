import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../Assets/logo.jpeg';

function NavBar() {
  return (
    <nav className='nav-bar'>
      <h1>
        <img className='logo' src={logo} alt='Brew Buddy Logo' />
      </h1>
      <NavLink className={'nav-link'} to='/'>
        search
      </NavLink>
      <NavLink className='see-all-favorites-btn nav-link' to='/favorites'>
        favorites
      </NavLink>
    </nav>
  );
}

export default NavBar;
