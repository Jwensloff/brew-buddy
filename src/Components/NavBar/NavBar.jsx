import './NavBar.scss';
import { NavLink } from 'react-router-dom';
import { useBreweries } from '../../Context/BreweryContext';

function NavBar() {
  const {setContextSelected} = useBreweries();

  function resetSelected(){
    setContextSelected()
  }

  return (
    <nav className='navBar'>
      <ul>
        <NavLink className={'navLink'} to='/'>search</NavLink>
        <NavLink className='see-all-favorites-btn navLink' onClick={resetSelected} to='/favorites'>favorites</NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;
