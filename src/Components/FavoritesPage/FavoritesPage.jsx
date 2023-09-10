import { useFavorites } from '../../Context/FavoriteContext';
import BreweryCard from '../BreweryCard/BreweryCard';
import './FavoritesPage.scss';

export function FavoritesPage() {
  const { favorites } = useFavorites();
  console.log(favorites)

  const cards = favorites.map((brewery) => {
    return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
  });

  return <div>{cards}</div>
}

export default FavoritesPage;
