import { useReducer, useState } from 'react';
import './Search.scss';
import { useBreweries } from '../../Context/BreweryContext';
import PropTypes from 'prop-types';

const initialErrorMessage = '';

function errorMessageReducer(state, action) {
  switch (action.type) {
    case 'SET_ERROR_MESSAGE':
      return { error: action.error, type: action.errorType };
    case 'CLEAR_ERROR_MESSAGE':
      return '';
    default:
      return state;
  }
}

function Search() {
  const [errorState, dispatchErrorMsg] = useReducer(
    errorMessageReducer,
    initialErrorMessage
  );
  const [formData, setFormData] = useState({
    city: '',
    state: 'Select State'
  });

  const { obtainBreweries,setIsSelected, isSelected } = useBreweries();

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
  return listOfStates.reduce((uniqueStates, state) => {
    if (!uniqueStates.some(s => s.name === state.name)) {
      uniqueStates.push(state);
    }
    return uniqueStates;
  }, []);
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
    dispatchErrorMsg({ type: 'CLEAR_ERROR_MESSAGE' });

    if (!formData.city.match(regex)) {
      dispatchErrorMsg({
        type: 'SET_ERROR_MESSAGE',
        error: 'Please enter a valid city.',
        errorType: 'city'
      });
      return;
    } else if (formData.city && formData.state === 'Select State') {
      dispatchErrorMsg({
        type: 'SET_ERROR_MESSAGE',
        error: 'Please select a state to get started.',
        errorType: 'state'
      });
      return;
    } else if (!formData.city && formData.state === 'Select State') {
      dispatchErrorMsg({
        type: 'SET_ERROR_MESSAGE',
        error: 'Please specify a location to get started.'
      });
      return;
    } else {
      setIsSelected(false)
      obtainBreweries(formData.city, formData.state);
    }
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
      {errorState && (
        <p className={`location-error-message ${errorState.type}-error`}>
          {errorState.error}
        </p>
      )}
    </div>
  );
}

Search.propTypes = {
  obtainBreweries: PropTypes.func,
};

export default Search;
