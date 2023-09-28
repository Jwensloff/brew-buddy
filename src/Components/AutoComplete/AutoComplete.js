import './AutoComplete.css'
import {useState} from 'react'

function AutoComplete(){
    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);


    function suggestionSelect(suggestion) {
        setValue(suggestion);
        setShowSuggestions(false);
    }

    return (
        <div className='auto-complete'>
            <input className='city-input' value={value} onChange={(e) => setValue(e.target.value)} onFocus={() => setShowSuggestions(true)} placeholder='Select a city (optional)' ></input>
            {showSuggestions && (
                <ul className='suggestions'>
                    {suggestions.map(suggestion => (
                        <li key={suggestion} ></li>
                    ))}
                </ul>
            )}
        </div>
    )
}