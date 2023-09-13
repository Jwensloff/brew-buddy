import { useState } from 'react';
import './Search.scss';
import { useBreweries } from '../../Context/BreweryContext';

function Search() {
  const [formData, setFormData] = useState({
    city: '',
    state: 'Select State'
  });
  const [noState, setNoState] = useState(false);
  const [noLocation, setNoLocation] = useState(false);
  const [validInput, setValidInput] = useState(true);

  const { obtainBreweries } = useBreweries();

  const updateFormData = e => {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      };
    });
  };

  const states = require('us-state-converter');
  const listOfStates = states();
  const regex = /^[a-zA-Z\s-]*$/;

  const noDuplicates = () => {
    let noDuplicateStatesArray = [];
    let stateNames = [];

    listOfStates.forEach(state => {
      if (stateNames.includes(state.name)) {
        return;
      }
      stateNames.push(state.name);
      noDuplicateStatesArray.push(state);
    });
    return noDuplicateStatesArray;
  };

  const filteredStates = noDuplicates();
  const dropdownList = filteredStates.map(state => {
    return (
      <option className='dropdown-item' key={state.name} value={state.name}>
        {state.usps}
      </option>
    );
  });

  async function submitForm(e) {
    e.preventDefault();

    if (!formData.city.match(regex)) {
      setValidInput(false);
      setNoState(false);
      setNoLocation(false);
      return;
    }

    if (formData.city && formData.state === 'Select State') {
      setValidInput(true);
      setNoState(true);
      setNoLocation(false);
      return;
    }
    if (formData.state === 'Select State' && !formData.city) {
      setValidInput(true);
      setNoLocation(true);
      setNoState(false);
      return;
    }

    await obtainBreweries(formData.city, formData.state);
    setNoLocation(false);
    setNoState(false);
    setValidInput(true);
  }

  return (
    <div className='search-container'>
      <form className='search-bar' onSubmit={submitForm}>
        <input
          id='searchInput'
          type='search'
          key='search'
          name='city'
          value={formData.city}
          placeholder='City (optional)'
          onChange={updateFormData}
        />

        <select
          id='dropdown'
          name='state'
          className='dropdown'
          value={formData.state}
          onChange={updateFormData}
        >
          <option className='dropdown-item' key={'select-state'}>
            {' '}
            Select State{' '}
          </option>
          {dropdownList}
        </select>
        <button type='submit' className='btn' id='searchBtn'>
          Search
        </button>
      </form>

      {noState && (
        <p className='location-error-message state-error'>
          Please select a state to get started.
        </p>
      )}
      {noLocation && (
        <p className='location-error-message'>
          Please specify a location to get started.
        </p>
      )}
      {!validInput && (
        <p className='location-error-message city-error'>Please enter a valid city.</p>
      )}
    </div>
  );
}

export default Search;
