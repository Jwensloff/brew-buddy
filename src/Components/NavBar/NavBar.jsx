import './NavBar.scss';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className='navBar'>
      <ul>
        <NavLink className={'navLink'} to='/'>search</NavLink>
        <NavLink className={'navLink'} to='/favorites'>favorites</NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;
