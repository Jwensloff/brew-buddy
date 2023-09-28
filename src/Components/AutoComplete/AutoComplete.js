import './AutoComplete.css'
import {useState, useRef, useEffect} from 'react'
import {cities} from './cities'

function AutoComplete(){
    const inputRef = useRef(null);
    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = cities.filter((city) => city.toLowerCase().startsWith(value.toLowerCase())).slice(0,6)


    function handleClick(e){
        if(!inputRef.current.contains(e.target) ){
            setShowSuggestions(false)
        }
    }
    
    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick);
        }
    },[])
    

    function selectSuggestion(suggestion) {
        setValue(suggestion);
        setShowSuggestions(false);
    }

    return (
        <div ref={inputRef} className='auto-complete'>
            <input 
                className='city-input' 
                value={value} 
                onChange={(e) => {
                    setShowSuggestions(true);
                    setValue(e.target.value)}
                    }  
                placeholder='Select a city (optional)' >
            </input>
            {showSuggestions && (
                <ul className='suggestions'>
                    {suggestions.map(suggestion => (
                        <li key={suggestion} onClick={() => selectSuggestion(suggestion)}>{suggestion}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AutoComplete