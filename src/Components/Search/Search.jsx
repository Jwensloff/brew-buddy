import { useState } from 'react';
import './Search.scss';

function Search() {
  const [location, setLocation] = useState('');

  return (
    <form className='searchBar'>
      <input
        id='searchInput'
        type='search'
        name='location-search'
        value={location}
        placeholder='location'
        onChange={e => setLocation(e.target.value)}
      />
      <input id='searchBtn' type='submit' className='btn' onClick={e => e.preventDefault()} />
    </form>
  );
}

export default Search;
