import { useState } from 'react';
import './Search.scss';
import { useBreweries } from '../../Context/BreweryContext';

function Search() {
  const [location, setLocation] = useState('');

  const { obtainBreweries } = useBreweries();

  async function submitForm(e) {
    e.preventDefault();
    obtainBreweries(location);
  }

  return (
    <form className='searchBar' onSubmit={submitForm}>
      <input
        id='searchInput'
        type='search'
        name='location-search'
        value={location}
        placeholder='location'
        onChange={(e) => setLocation(e.target.value)}
      />
      <input id='searchBtn' type='submit' className='btn' />
    </form>
  );
}

export default Search;
