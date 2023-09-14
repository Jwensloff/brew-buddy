import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';
import { useBreweries } from '../../Context/BreweryContext';
import { useFavorites } from '../../Context/FavoriteContext';
import { useEffect, useState } from 'react';
import { getBreweries } from '../../apiCalls';

function BreweryContainer() {
  const { breweries, noResults } = useBreweries();
  const {
    favorites,
    getFilteredBreweries,
    toggleFavoritesFilter,
    favoriteFilter,
  } = useFavorites();
  const [cards, setCards] = useState([]);

  function createCards(displayedBreweries) {
    return displayedBreweries.map(brewery => {
      return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
    });
  }

  useEffect(() => {
    setCards(createCards(getFilteredBreweries()));
  }, [favorites, breweries, favoriteFilter]);

  const styles = {
    backgroundColor: favoriteFilter ? '#808000' : '#BAB86C',
    color: favoriteFilter ? '#f7f7ed' : '#273f1d',
  };

  return (
    <>
      {noResults ? (
        <section className='no-results-message'>
          We're sorry, we didn't find any breweries.
        </section>
      ) : (
        <section className='breweryContainer'>
          <button
            className='filter-btn'
            style={styles}
            onClick={toggleFavoritesFilter}
          >
            Filter Local Breweries by Favorite
          </button>
          {cards.length ? cards : 'Search Results Will Appear Here'}
        </section>
      )}
    </>
  );
}

export default BreweryContainer;
