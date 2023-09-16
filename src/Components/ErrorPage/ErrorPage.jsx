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

  const errorMsg = error ? (
    <>
      <p>404</p>
      <p>{error || 'Resource Not Found'}</p>
    </>
  ) : (
    <>
      <p>Too many brews, buddy?</p>
      <p>{error || 'Something Went Wrong'}</p>
    </>
  );

  return (
    <section className='error-page-wrapper'>
      <div
        className='error-page-beer-image'
        role='img'
        aria-label='Cartoon style mug full of golden beer and white, bubbly foam spilling out of the top'
      ></div>
      <div className='error-text-container'>{errorMsg}</div>
    </section>
  );
}

useBreweries.propTypes = {
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
}