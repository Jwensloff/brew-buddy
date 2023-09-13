import { useState } from 'react';
import './Search.scss';
import { useBreweries } from '../../Context/BreweryContext';
import PropTypes from 'prop-types';

function Search() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [noState, setNoState] = useState(false);
  const [noLocation, setNoLocation] = useState(false);
  const [validInput, setValidInput] = useState(true);

  const { obtainBreweries } = useBreweries();

  const states = require('us-state-converter');
  const listOfStates = states();
  const regex = /^[a-zA-Z\s-]*$/;

  const noDuplicates = () => {
    let noDuplicateStatesArray = [];
    let stateNames = [];

    listOfStates.forEach((state) => {
      if (stateNames.includes(state.name)) {
        return;
      }
      stateNames.push(state.name);
      noDuplicateStatesArray.push(state);
    });
    return noDuplicateStatesArray;
  };

  const filteredStates = noDuplicates();
  const dropdownList = filteredStates.map((state) => {
    return (
      <option className='dropdown-item' key={state.name} value={state.name}>
        {state.usps}
      </option>
    );
  });

  async function submitForm(e) {
    e.preventDefault();

    if (!city.match(regex)) {
      setValidInput(false);
      setNoState(false);
      setNoLocation(false);
      return;
    }
    if (city && !state) {
      setValidInput(true);
      setNoState(true);
      setNoLocation(false);
      return;
    }
    if (!state && !city) {
      setValidInput(true);
      setNoLocation(true);
      setNoState(false);
      return;
    }

    obtainBreweries(city, state);
    setNoLocation(false);
    setNoState(false);
    setValidInput(true);
  }

  return (
    <>
      {noState && (
        <p className='location-error-message'>
          Please select a state to get started.
        </p>
      )}
      {noLocation && (
        <p className='location-error-message'>
          Please specify a location to get started.
        </p>
      )}
      {!validInput && (
        <p className='location-error-message'>Please enter a valid city.</p>
      )}

      <form className='search-bar' onSubmit={submitForm}>
        <input
          id='searchInput'
          type='search'
          key='search'
          name='city-search'
          value={city}
          placeholder='City (optional)'
          onChange={(e) => setCity(e.target.value)}
        />

        <select
          id='dropdown'
          name='dropdown'
          className='dropdown'
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option className='dropdown-item' key={'select-state'}>
            {' '}
            Select State{' '}
          </option>
          {dropdownList}
        </select>
        <input id='searchBtn' type='submit' className='btn' />
      </form>
    </>
  );
}

Search.propTypes = {
  obtainBreweries: PropTypes.func,
};

export default Search;
