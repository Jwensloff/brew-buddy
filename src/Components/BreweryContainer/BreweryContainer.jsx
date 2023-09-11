import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';
import { useBreweries } from '../../Context/BreweryContext';
import { useFavorites } from '../../Context/FavoriteContext';
import { useEffect, useState } from 'react';
import { getBreweries } from '../../apiCalls';

function BreweryContainer() {
  const { breweries, noResults } = useBreweries();
  const { favorites, getFilteredBreweries, toggleFavoritesFilter, favoriteFilter} = useFavorites();
  const [cards, setCards] = useState([])


  function createCards(displayedBreweries) {
    return displayedBreweries.map(brewery => {
      return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
    });
  }

  useEffect(() => {
    setCards(createCards(getFilteredBreweries()))
  }, [favorites, breweries, favoriteFilter])

  return (
    <>
      {noResults ? (
        <section className='no-results-message'>
          We're sorry, we didn't find any breweries.
        </section>
      ) : (
        <section className='breweryContainer'>
          <button onClick={toggleFavoritesFilter}>Fav filter</button>
          {cards.length ? cards : 'Search Results Will Appear Here'}
        </section>
      )}
    </>
  );
}

export default BreweryContainer;
