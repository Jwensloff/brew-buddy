import { useEffect, useState, useRef} from 'react';
import { useFavorites } from '../../Context/FavoriteContext';
import './BreweryCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import { useBreweries } from '../../Context/BreweryContext';


function BreweryCard({ brewery}) {
  const { name, street, phone, brewery_type, website_url, city, id } = brewery;
  const directionsURL = `https://www.google.com/maps/dir/${name},${street}+${city}`;
  const { toggleFavorite, favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const {setContextSelected, selectedBrewery} = useBreweries();
  const cardRefs = useRef({})

  useEffect(() => {
    if (favorites.find((favBrewery) => favBrewery.id === brewery.id)) {
      setIsFavorite(true);
    }
  }, []);

  useEffect(() => {
    if(selectedBrewery && cardRefs.current[selectedBrewery]){
      cardRefs.current[selectedBrewery].scrollIntoView({ behavior: 'smooth'})
    }
  },[selectedBrewery])

  function toggleIsFavorite() {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  }

  function focusElement(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); 
      e.target.focus(); 
      e.target.click(); 
    }
  }

    return (
    <article tabIndex="0"  onKeyDown={(e)=>{focusElement(e)}} className={brewery.id === selectedBrewery ? 'brewery-card selected' : 'brewery-card'} onClick={() => {setContextSelected(brewery.id)}} ref={(ref) => cardRefs.current[brewery.id] = ref} >
      <h2 className='card-text name'>{name}</h2>
      {street && <p className='card-text'>{street + ', ' + city}</p>}
      {phone && <p className='card-text'>{formatPhoneNumber(phone)}</p>}
     
      <div className='card-a-box'>
        {website_url && (
          <a
            className='card-a'
            href={website_url}
            target='_blank'
            rel='noreferrer'
          >
            Website
          </a>
        )}
        {street && (
          <a
            className='card-a'
            href={directionsURL}
            target='_blank'
            rel='noreferrer'
          >
            Directions
          </a>
        )}
      </div>
      <button
        aria-label='Toggle favorites button'
        className='brewery-card-favorites-btn'
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(brewery);
          toggleIsFavorite();
        }}
      >
        {isFavorite ? (
          <FontAwesomeIcon icon={faBookmark} color={'#273f1d'} size='xl' aria-label="Remove from favorites button"/>
        ) : (
          <FontAwesomeIcon icon={farBookmark} color={'#273f1d'} size='xl' aria-label="Add to favorites button"/>
        )}
      </button>
    </article>
  );
}

function formatPhoneNumber(number) {
  const strNum = `${number}`;
  return `(${strNum.substring(0, 3)}) ${strNum.substring(
    3,
    6
  )}-${strNum.substring(6, 10)}`;
}

BreweryCard.propTypes = {
  brewery: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    phone: PropTypes.string,
    brewery_type: PropTypes.string,
    website_url: PropTypes.string,
    city: PropTypes.string,
    id: PropTypes.string,
  }),
  toggleFavorite: PropTypes.func,
  favorites: PropTypes.object,
};

export default BreweryCard;
