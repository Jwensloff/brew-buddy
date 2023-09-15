import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';
import { useBreweries } from '../../Context/BreweryContext';
import { useFavorites } from '../../Context/FavoriteContext';
import { useEffect, useState } from 'react';

function BreweryContainer() {
  const { breweries, noResults } = useBreweries();
  const {
    filteredBreweries,
    toggleFavoritesFilter,
    isFaveFilterOn,
  } = useFavorites();

   const cards = filteredBreweries.map((brewery) => {
    return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
  });

  const styles = {
    backgroundColor: isFaveFilterOn ? '#A9721F' : '#e0cc99',
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
