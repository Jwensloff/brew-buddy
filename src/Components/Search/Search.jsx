import { useState } from 'react';
import './Search.scss';
import getBreweries from '../../apiCalls';

function Search({ setBreweries }) {
  const [location, setLocation] = useState('');

  async function submitForm(e) {
    e.preventDefault();
    const data = await getBreweries(location);
    setBreweries(data);
  }

  return (
    <form className='searchBar' onSubmit={submitForm}>
      <input
        id='searchInput'
        type='search'
        name='location-search'
        value={location}
        placeholder='location'
        onChange={e => setLocation(e.target.value)}
      />
      <input id='searchBtn' type='submit' className='btn' />
    </form>
  );
}

export default Search;
