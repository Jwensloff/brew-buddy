import { useEffect, useReducer, useRef } from 'react';
import './Search.scss';
import { useBreweries } from '../../Context/BreweryContext';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { cities } from './cities';

const initialErrorMessage = '';

const initialFormData = {
  city: '',
  state: 'Select State',
  formIsReady: false,
  showSuggestions: false,
  suggestions: [],
  focusedIndex: -1
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
    case 'SET_SHOW_SUGGESTIONS':
      return { ...state, showSuggestions: action.payload };
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload };
    case 'SET_FOCUSED_INDEX':
      return { ...state, focusedIndex: action.payload };
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
  const {
    city,
    state,
    formIsReady,
    showSuggestions,
    suggestions,
    focusedIndex
  } = formState;
  const searchBtnRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const { obtainBreweries, setIsSelected } = useBreweries();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const cityParam = queryParams.get('city');
    const stateParam = queryParams.get('state');

    if (cityParam || stateParam) {
      dispatchForm({ type: 'SET_CITY', payload: cityParam || '' });
      dispatchForm({ type: 'SET_STATE', payload: stateParam });
      dispatchForm({ type: 'SET_FORM_IS_READY', payload: true });
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
      setIsSelected(false);
      navigate(
        `${formattedCity ? `/?city=${formattedCity}&` : '?'}state=${state}`
      );
      obtainBreweries(formattedCity, state);
    }
  }

  function selectSuggestion(suggestion) {
    // suggestion format: "city, state"
    const [city, state] = suggestion.split(',');

    dispatchForm({ type: 'SET_CITY', payload: city });
    dispatchForm({ type: 'SET_STATE', payload: state.trim() });
    dispatchForm({ type: 'SET_SHOW_SUGGESTIONS', payload: false });
  };

  useEffect(() => {
    const suggestionsArray = cities.filter(c =>
      c.toLowerCase().startsWith(city.toLowerCase())
    );

    const suggestionsWithIDs = suggestionsArray.reduce((acc, curr, index) => {
      return [
        ...acc,
        {
          id: index,
          location: curr
        }
      ];
    }, []);
    dispatchForm({ type: 'SET_SUGGESTIONS', payload: suggestionsWithIDs });
  }, [city]);

  const suggestionsJSX = suggestions && (
    <ul className='suggestions' ref={listRef}>
      {suggestions.map((suggestion, index) => {
        const { id, location } = suggestion;
        const isFocused = focusedIndex === index;

        return (
          <li
            key={id}
            id={id}
            onClick={() => selectSuggestion(location)}
            className={isFocused ? 'focused' : ''}
            onMouseEnter={() =>
              dispatchForm({ type: 'SET_FOCUSED_INDEX', payload: index })
            }
            onMouseLeave={() =>
              dispatchForm({ type: 'SET_FOCUSED_INDEX', payload: -1 })
            }
          >
            {location}
          </li>
        );
      })}
    </ul>
  );

  function handleCityInputUnfocusEvent(e) {
    if (!inputRef.current.contains(e.target)) {
      dispatchForm({ type: 'SET_SHOW_SUGGESTIONS', payload: false });
    }
  }

  function handleInputKeyDown(e) {
    if (e.key === 'ArrowDown' && focusedIndex === -1) {
      dispatchForm({ type: 'SET_FOCUSED_INDEX', payload: 0 });
    } else if (e.key === 'ArrowDown') {
      const nextIndex =
        focusedIndex < suggestions.length - 1 ? focusedIndex + 1 : 0;

      dispatchForm({ type: 'SET_FOCUSED_INDEX', payload: nextIndex });
    } else if (e.key === 'ArrowUp') {
      const prevIndex =
        focusedIndex > 0 ? focusedIndex - 1 : suggestions.length - 1;

      dispatchForm({ type: 'SET_FOCUSED_INDEX', payload: prevIndex });
    } else if (e.key === 'Enter') {
      if (focusedIndex !== -1) {
        listRef.current.children[focusedIndex].click();
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleCityInputUnfocusEvent);

    return () => {
      document.removeEventListener('click', handleCityInputUnfocusEvent);
    };
  }, []);

  return (
    <div className='search-container'>
      <form ref={inputRef} className='search-bar' onSubmit={submitForm}>
        <input
          aria-label='Enter a location'
          id='searchInput'
          type='search'
          key='search'
          name='city'
          value={city}
          placeholder='Select a city (optional)'
          autoComplete='off'
          onKeyDown={e => handleInputKeyDown(e)}
          onChange={e => {
            dispatchForm({ type: 'SET_SHOW_SUGGESTIONS', payload: true });
            dispatchForm({ type: 'SET_CITY', payload: e.target.value });
          }}
        />
        {showSuggestions && suggestionsJSX}
        <select
          aria-label='Select a state'
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
