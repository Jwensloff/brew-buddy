import './BreweryCard.scss';
import { useEffect, useState, useRef} from 'react';
import { useBreweries } from '../../Context/BreweryContext';
import {useLocation} from 'react-router-dom'
import { useFavorites } from '../../Context/FavoriteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';


function BreweryCard({ brewery}) {
  const { name, street, phone, brewery_type, website_url, city, id } = brewery;
  const directionsURL = `https://www.google.com/maps/dir/${name},${street}+${city}`;
  const { toggleFavorite, favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const {setContextSelected, selectedBrewery, userLocation, locationPermission, breweries} = useBreweries();
  const cardRefs = useRef({})
  const location = useLocation();
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

  function calcDistanceFromSelected() {
    const brews = [...breweries];
    const userLat = userLocation[0];
    const userLong = userLocation[1]
    const breweriesWithDistance = brews.map(brewery => {
      const distance = calculateDistance(
        userLat,
        userLong,
        brewery.latitude,
        brewery.longitude,
      );

      return { ...brewery, distance };
    });
  }

  function calculateDistance(lat1, long1, lat2, long2) {
    let latRad1 = (Number(lat1) * Math.PI) / 180;
    let latRad2 = (Number(lat2) * Math.PI) / 180;
    let longRad1 = (Number(long1) * Math.PI) / 180;
    let longRad2 = (Number(long2) * Math.PI) / 180;
    const distance =
      3958 *
      Math.acos(
        Math.sin(latRad1) * Math.sin(latRad2) +
          Math.cos(latRad1) * Math.cos(latRad2) * Math.cos(longRad2 - longRad1),
      );
    return distance;
  }

    return (
    <article tabIndex="0"  onKeyDown={(e)=>{focusElement(e)}} className={brewery.id === selectedBrewery ? 'brewery-card selected' : 'brewery-card'} 
      onClick={() => {if(location.pathname !=='/favorites'){setContextSelected(brewery.id)}}} ref={(ref) => cardRefs.current[brewery.id] = ref} >
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
    name: PropTypes.string.isRequired,
    street: PropTypes.string,
    phone: PropTypes.string,
    brewery_type: PropTypes.string,
    website_url: PropTypes.string,
    city: PropTypes.string,
    id: PropTypes.string,
  }),
  
};

useFavorites.propTypes = {
  toggleFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BreweryCard;
