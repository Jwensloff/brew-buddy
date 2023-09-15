import { useEffect, useState } from 'react';
import { useFavorites } from '../../Context/FavoriteContext';
import './BreweryCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import { useBreweries } from '../../Context/BreweryContext';

function BreweryCard({ brewery, selectBrewery }) {
  const { name, street, phone, brewery_type, website_url, city, id } = brewery;
  const directionsURL = `https://www.google.com/maps/dir/${name},${street}+${city}`;
  const { toggleFavorite, favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const {setContextSelected, selectedBrewery} = useBreweries();

  useEffect(() => {
    if (favorites.find((favBrewery) => favBrewery.id === brewery.id)) {
      setIsFavorite(true);
    }
  }, []);

  function toggleIsFavorite() {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  }
  
  return (
    <article className={brewery.id === selectedBrewery ? 'brewery-card selected' : 'brewery-card'} onClick={() => {setContextSelected(id)} }>
      <h3 className='card-text name'>{name}</h3>
      <p className='card-text type'>{brewery_type}</p>
      {street && <p className='card-text'>{street}</p>}
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
        className='breweryCard-favorites-btn'
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(brewery);
          toggleIsFavorite();
        }}
      >
        {isFavorite ? (
          <FontAwesomeIcon icon={faBookmark} size='xl' />
        ) : (
          <FontAwesomeIcon icon={farBookmark} size='xl' />
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
