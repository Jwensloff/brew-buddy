import './ErrorPage.scss';
import { useBreweries } from '../../Context/BreweryContext';

function ErrorPage() {
  const { error } = useBreweries();

  return (
    <section className='error-page-wrapper'>
      <p>This is an error.</p>
    </section>
  );
}

export default ErrorPage;
