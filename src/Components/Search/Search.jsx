import { useState } from 'react';
import './Search.scss';
import { useBreweries } from '../../Context/BreweryContext';

function Search() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const { obtainBreweries } = useBreweries();

  const states = require('us-state-converter');
  const listOfStates = states();

  const dropdownList = listOfStates.map((state) => {
    return <option value={state.name}><span>{state.usps}</span></option>;
  });

  async function submitForm(e) {
    e.preventDefault();
    obtainBreweries(city, state);
    console.log(state);
  }

  return (
    <form className='searchBar' onSubmit={submitForm}>
      <input
        id='searchInput'
        type='search'
        name='city-search'
        value={city}
        placeholder='City'
        onChange={(e) => setCity(e.target.value)}
      />

      <select
        id='dropdown'
        name='dropdown'
        className='dropdown'
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option className='dropdown-item'> Select State </option>
        {dropdownList}
      </select>
      <input id='searchBtn' type='submit' className='btn' />
    </form>
  );
}

export default Search;

//Error handling
// Make sure there aren't any cities that match --> a message appears --> handle typos
// Add a second input for the state ==> make sure to include that input into the api request
// If there aren't any breweries that alingn with the inputs ->  have a message appear that say so
// Handle user input --> prevent any kind of number or special character input

// Take a look at error handling for api requests
// Do we need to create an error page?
