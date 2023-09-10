import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';
import { useBreweries } from '../../Context/BreweryContext';


function BreweryContainer() {
  const { breweries, noResults } = useBreweries();

  console.log('breweries from container', breweries);
  const cards = breweries.map((brewery) => {
    return <BreweryCard brewery={brewery} key={brewery.id}></BreweryCard>;
  });

  return (
    <>
      {noResults ? <section className='no-results-message'>
        We're sorry, we didn't find any breweries.
        </section>
       : (
        <section className='breweryContainer'>
          {cards.length ? cards : 'Search Results Will Appear Here'}
        </section>
      )}
    </>
  );
}

export default BreweryContainer;
