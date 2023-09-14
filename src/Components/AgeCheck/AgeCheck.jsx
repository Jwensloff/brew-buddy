import './AgeCheck.scss';
import { useState } from 'react';

function AgeCheck({ setisLegal }) {

  const ageVerification = () => {
    localStorage.setItem('isLegal', JSON.stringify(true));
    setisLegal(true);
  };

  return (
      <div className='overlay-container'>
        <div className='age-check-wrapper'>
          <h2 className='content age-q'>Are you 21?</h2>
          <div className='age-button-container'>
            <button
              onClick={() => ageVerification()}
              className='yes-button content'
            >
              Yes
            </button>
          </div>
          <h2 className='content'>
            Brew Buddy is for individuals of legal drinking age.
          </h2>
        </div>
      </div>
  );
}

export default AgeCheck;
