import { useEffect, useState } from 'react';
import { useFavorites } from '../../Context/FavoriteContext';
import './BreweryCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons'

function BreweryCard({ brewery }) {
  const { name, street, phone, brewery_type, website_url, city } = brewery;
  const directionsURL = `https://www.google.com/maps/dir/${name},${street}+${city}`;
  const { toggleFavorite, favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites.find(favBrewery => favBrewery.id === brewery.id)) {
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
    <article className='breweryCard'>
      <h3 className='card-text name'>{name}</h3>
      <p className='card-text'>{street}</p>
      <p className='card-text'>{phone}</p>
      <p className='card-text'>{brewery_type}</p>
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
        <a
          className='card-a'
          href={directionsURL}
          target='_blank'
          rel='noreferrer'
        >
          Directions
        </a>
      </div>
      <button
        className='breweryCard-favorites-btn'
        onClick={() => {
          toggleFavorite(brewery);
          toggleIsFavorite();
        }}
      >
             {isFavorite ? <FontAwesomeIcon icon={faBookmark} /> : <FontAwesomeIcon icon={farBookmark} />}

      </button>
    </article>
  );
}

export default BreweryCard;
