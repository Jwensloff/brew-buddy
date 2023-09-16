import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../Assets/logo.jpeg';

function NavBar() {
  return (
    <nav className='navBar'>
      <h1>
        <img className='logo' src={logo} alt='Brew Buddy Logo' />
      </h1>
      <NavLink className={'navLink'} to='/'>
        search
      </NavLink>
      <NavLink className='see-all-favorites-btn navLink' to='/favorites'>
        favorites
      </NavLink>
    </nav>
  );
}

export default NavBar;
