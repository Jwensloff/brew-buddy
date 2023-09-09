import { useEffect, useState } from 'react';
import { useFavorites } from '../../Context/FavoriteContext';
import './BreweryCard.scss';

function BreweryCard({ brewery }) {
  const { name, street, phone, brewery_type, website_url, city } = brewery;
  const directionsURL = `https://www.google.com/maps/dir/${name},${street}+${city}`;
  const { toggleFavorite, favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  let className;

  function toggleIsFavorite() {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  }

  const favoriteStyles = {
    backgroundColor: isFavorite ? '#000' : '#fff',
  };

  return (
    <article className='breweryCard'>
      <p className='card-text name'>{name}</p>
      <p className='card-text'>{street}</p>
      <p className='card-text'>{phone}</p>
      <p className='card-text'>{brewery_type}</p>
      <a className='card-a' href={website_url} target='_blank' rel='noreferrer'>
        Website
      </a>
      <a
        className='card-a'
        href={directionsURL}
        target='_blank'
        rel='noreferrer'
      >
        Directions
      </a>
      <button
        style={favoriteStyles}
        onClick={() => {
          toggleFavorite(brewery);
          toggleIsFavorite();
        }}
      >
        fav
      </button>
    </article>
  );
}

export default BreweryCard;
