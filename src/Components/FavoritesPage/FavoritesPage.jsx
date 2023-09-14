import { useFavorites } from '../../Context/FavoriteContext';
import BreweryCard from '../BreweryCard/BreweryCard';
import NavBar from '../NavBar/NavBar';
import './FavoritesPage.scss';

export function FavoritesPage() {
  const { favorites } = useFavorites();

  const cards = favorites.map(brewery => {
    return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
  });

  return (
    <div className='favorites-page'>
      <section className='favs-grid'>{cards}</section>
    </div>
  );
}

export default FavoritesPage;
