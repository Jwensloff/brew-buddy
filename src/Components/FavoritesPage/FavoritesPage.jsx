import { useFavorites } from '../../Context/FavoriteContext';
import BreweryCard from '../BreweryCard/BreweryCard';
import PropTypes from 'prop-types';
import './FavoritesPage.scss';

export function FavoritesPage() {
  const { favorites } = useFavorites();

  const cards = favorites.map((brewery) => {
    return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
  });

  console.log('cards', cards);

  return (
    <div className='favorites-page'>
      {cards.length === 0 && <p className='no-fave-message'>You don't have any favorites yet.</p>}
      <section className='favs-grid'>{cards}</section>
    </div>
  );
}

export default FavoritesPage;

useFavorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};
