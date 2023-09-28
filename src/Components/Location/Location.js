import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

  import {useState} from 'react'

function Location() {
    const [address, setAddress] = useState('')

    function handleChange(){
        console.log("CHANGE")
    }

    function handleSelect(){
        console.log("SELECT")
    }
    return (
        <div className='input'>

            <PlacesAutocomplete onChange={handleChange} value={address} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Please type in a city',
                name: 'select-adress',
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={suggestion.placeId}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
            </PlacesAutocomplete>
        </div>

    )
}

export default Location;