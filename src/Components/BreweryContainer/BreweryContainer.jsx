import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';

function BreweryContainer({ breweries }) {
  const cards = breweries.map(brewery => {
    return <BreweryCard brewery={brewery} key={brewery.name}></BreweryCard>;
  });

  return (
    <section className='breweryContainer'>
      {cards.length ? cards : 'Search Results Will Appear Here'}
    </section>
  );
}

export default BreweryContainer;
