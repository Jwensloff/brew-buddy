import './AgeCheck.scss';
import PropTypes from 'prop-types';

function AgeCheck({ setisLegal }) {

  const ageVerification = () => {
    localStorage.setItem('isLegal', JSON.stringify(true));
    setisLegal(true);
  };

  return (
      <div className='overlay-container'>
        <div className='age-check-wrapper'>
          <h2 className='content age-q' id='ageQ'>Are you 21?</h2>
          <div className='age-button-container'>
            <button
              onClick={() => ageVerification()}
              className='yes-button content'
            >
              Yes
            </button>
            <a href="https://www.caprisun.com/" rel="noopener noreferrer">
      <button className='no-button content'
>No</button>
    </a>

          </div>
          <h2 className='content'>
            Brew Buddy is for individuals of legal drinking age.
          </h2>
        </div>
      </div>
  );
}

AgeCheck.propTypes = {
  setisLegal: PropTypes.bool.isRequired
}


export default AgeCheck;