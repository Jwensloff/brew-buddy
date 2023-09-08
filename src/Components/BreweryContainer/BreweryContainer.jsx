import BreweryCard from '../BreweryCard/BreweryCard';
import './BreweryContainer.scss';

function BreweryContainer() {
  return (
    <section className='breweryContainer'>
      <BreweryCard />
      <BreweryCard />
      <BreweryCard />
    </section>
  );
}

export default BreweryContainer;
