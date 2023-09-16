import { useEffect, useReducer, useRef } from 'react';
import './Search.scss';
import { useBreweries } from '../../Context/BreweryContext';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

const initialErrorMessage = '';

const initialFormData = {
  city: '',
  state: 'Select State',
  formIsReady: false
};

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

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_CITY':
      return { ...state, city: action.payload };
    case 'SET_STATE':
      return { ...state, state: action.payload };
    case 'SET_FORM_IS_READY':
      return { ...state, formIsReady: action.payload };
    default:
      return state;
  }
}

function Search() {
  const [errorState, dispatchErrorMsg] = useReducer(
    errorMessageReducer,
    initialErrorMessage
  );
  const [formState, dispatchForm] = useReducer(formReducer, initialFormData);
  const { city, state, formIsReady } = formState;
  const navigate = useNavigate();
  const searchBtnRef = useRef(null);
  const { obtainBreweries, setIsSelected, isSelected, setContextSelected } = useBreweries();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const cityParam = queryParams.get('city');
    const stateParam = queryParams.get('state');

    if (cityParam || stateParam) {
      dispatchForm({
        type: 'SET_CITY',
        payload: cityParam
      });
      dispatchForm({
        type: 'SET_STATE',
        payload: stateParam
      });
      dispatchForm({
        type: 'SET_FORM_IS_READY',
        payload: true
      });
    }
  }, [location]);

  useEffect(() => {
    if (formIsReady) {
      searchBtnRef.current.click();
    }
  }, [formIsReady]);

  const states = require('us-state-converter');
  const listOfStates = states().slice(0, 52);
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

    if (!city.match(regex)) {
      dispatchErrorMsg({
        type: 'SET_ERROR_MESSAGE',
        error: 'Please enter a valid city.',
        errorType: 'city'
      });
      return;
    } else if (city && (!state || state === 'Select State')) {
      dispatchErrorMsg({
        type: 'SET_ERROR_MESSAGE',
        error: 'Please select a state to get started.',
        errorType: 'state'
      });
      return;
    } else if (!city && (!state || state === 'Select State')) {
      dispatchErrorMsg({
        type: 'SET_ERROR_MESSAGE',
        error: 'Please specify a location to get started.'
      });
      return;
    } else {
      const formattedCity = city.trim();
      setContextSelected();
      navigate(`/?city=${formattedCity}&state=${state}`);
      obtainBreweries(formattedCity, state);
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
          value={city}
          placeholder='City (optional)'
          onChange={e =>
            dispatchForm({ type: 'SET_CITY', payload: e.target.value })
          }
        />
        <select
          id='dropdown'
          name='state'
          className='dropdown'
          value={state}
          onChange={e =>
            dispatchForm({ type: 'SET_STATE', payload: e.target.value })
          }
        >
          <option className='dropdown-item' key={'select-state'}>
            {' '}
            Select State{' '}
          </option>
          {dropdownList}
        </select>
        <button type='submit' className='btn' id='searchBtn' ref={searchBtnRef}>
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

useBreweries.propTypes = {
  obtainBreweries: PropTypes.func
};

export default Search;
