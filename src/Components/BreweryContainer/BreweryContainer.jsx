import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';
import { useBreweries } from '../../Context/BreweryContext';
import { useFavorites } from '../../Context/FavoriteContext';

function BreweryContainer() {
  const { breweries } = useBreweries();
  const { favorites } = useFavorites();

  

  const cards = breweries.map((brewery) => {
    return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
  });

  return (
    <section className='breweryContainer'>
      {cards.length ? cards : 'Search Results Will Appear Here'}
    </section>
  );
}

export default BreweryContainer;
