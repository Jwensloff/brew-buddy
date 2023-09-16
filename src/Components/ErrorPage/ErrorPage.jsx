import './ErrorPage.scss';
import { useBreweries } from '../../Context/BreweryContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types'

export default function ErrorPage() {
  const { error, setError } = useBreweries();
  const navigate = useNavigate();

  useEffect(() => {
    const returnToRootUrl = () => {
      setError(false);
      navigate('/');
    };
    window.onpopstate = returnToRootUrl;
    return () => window.removeEventListener('popstate', returnToRootUrl);
  });

  return (
    <section className='error-page-wrapper'>
      <p>{error}</p>
    </section>
  );
}

useBreweries.propTypes = {
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
}