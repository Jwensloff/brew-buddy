import { useState } from 'react';
import './Search.scss';

function Search() {
  const [location, setLocation] = useState('');

  return (
    <form>
      <input
        type='search'
        name='location-search'
        value={location}
        placeholder='location'
        onChange={e => setLocation(e.target.value)}
      />
      <input type='submit' onClick={e => e.preventDefault()} />
    </form>
  );
}

export default Search;
