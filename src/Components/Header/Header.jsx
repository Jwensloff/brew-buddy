import './Header.scss';
import Search from '../Search/Search';
// import logo from '../../Assets/logo.jpeg';

export default function Header() {
  return (
    <header className='main-header'>
      <div className='hero-img'></div>
      <Search />
    </header>
  );
}
