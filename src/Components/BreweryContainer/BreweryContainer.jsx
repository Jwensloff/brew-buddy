import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';
import { useBreweries } from '../../Context/BreweryContext';
import { useFavorites } from '../../Context/FavoriteContext';
import PropTypes from 'prop-types';

function BreweryContainer() {
  const { breweries, noResults } = useBreweries();
  const { filteredBreweries, toggleFavoritesFilter, isFaveFilterOn } =
    useFavorites();

  const cards = filteredBreweries.map(brewery => {
    return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
  });

  function calculateDistance(lat1, long1, lat2, long2) {
    let latRad1 = (Number(lat1) * Math.PI) / 180;
    let latRad2 = (Number(lat2) * Math.PI) / 180;
    let longRad1 = (Number(long1) * Math.PI) / 180;
    let longRad2 = (Number(long2) * Math.PI) / 180;
    const distance =
      3958 *
      Math.acos(
        Math.sin(latRad1) * Math.sin(latRad2) +
          Math.cos(latRad1) * Math.cos(latRad2) * Math.cos(longRad2 - longRad1),
      );
    return distance;
  }

  function calcDistanceFromSelected() {
    const [firstBrewery, ...restOfBreweries] = [...breweries];

    const breweriesWithDistance = restOfBreweries.map(brewery => {
      const distance = calculateDistance(
        firstBrewery.latitude,
        firstBrewery.longitude,
        brewery.latitude,
        brewery.longitude,
      );

      return { ...brewery, distance };
    });
  }

  const styles = {
    backgroundColor: isFaveFilterOn ? '#808000' : '#BAB86C',
    color: isFaveFilterOn ? '#f7f7ed' : '#273f1d',
  };

  const filterBtnMessage = isFaveFilterOn ? 'On' : 'Off';

  return (
    <>
      {noResults ? (
        <section className='no-results-message'>
          The beer trail is calling! 🍺 But we might need your help. Check your
          search and give it another shot.
        </section>
      ) : (
        <section className='brewery-container'>
          <button
            className='filter-btn'
            style={styles}
            onClick={toggleFavoritesFilter}
          >
            {`Filter Local Breweries by Favorite: ${filterBtnMessage}`}
          </button>
          {cards.length ? cards : 'Start by inputting a location!'}
        </section>
      )}
    </>
  );
}

useFavorites.propTypes = {
  getFilteredBreweries: PropTypes.func.isRequired,
  toggleFavoritesFilter: PropTypes.func.isRequired,
  isFaveFilterOn: PropTypes.bool.isRequired
}

useBreweries.propTypes = {
  breweries: PropTypes.object.isRequired,
  noResults: PropTypes.bool.isRequired,
}

export default BreweryContainer;
