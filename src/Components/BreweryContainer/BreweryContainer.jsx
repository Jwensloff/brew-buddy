import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';
import { useBreweries } from '../../Context/BreweryContext';
import { useFavorites } from '../../Context/FavoriteContext';
import { useEffect, useState } from 'react';

function BreweryContainer() {
  const { breweries, noResults } = useBreweries();
  const { favorites } = useFavorites();
  const [favoriteFilter, setFavoriteFilter] = useState(false);
  const [cards, setCards] = useState([])

  useEffect(() => {
    if (favoriteFilter) {
      let displayedBreweries = breweries.filter(brewery => favorites.includes(brewery))
      setCards(createCards(displayedBreweries))
    } else {
      setCards(createCards(breweries))
    }
  }, [favoriteFilter, breweries, favorites])
  
  function createCards(displayedBreweries) {
    return displayedBreweries.map(brewery => {
      return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
    });
  }
  

  function toggleFavoritesFilter() {
    setFavoriteFilter(prevFilter => (prevFilter ? false : true));
  }

  return (
    <>
      {noResults ? (
        <section className='no-results-message'>
          We're sorry, we didn't find any breweries.
        </section>
      ) : (
        <section className='breweryContainer'>
          {cards.length ? cards : 'Search Results Will Appear Here'}
        </section>
      )}
    </>
  );
}

export default BreweryContainer;
