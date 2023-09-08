import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';
import { useContext } from 'react';
import { BreweryContext, useBreweries } from '../Context/BreweryContext';


function BreweryContainer() {
  const breweries = useBreweries();

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
