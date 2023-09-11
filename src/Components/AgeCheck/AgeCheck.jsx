import './AgeCheck.scss';
import { useState } from 'react';

function AgeCheck({ setisLegal, isLegal }) {

  const ageVerification = (canAccessSite) => {
    if (!canAccessSite) {
      return;
    } else {
      localStorage.setItem('isLegal', JSON.stringify(true));
      setisLegal(true)
    }
  };

  return (
    <div className='age-check-overlay'>
      <div className='age-check-circle'>
        <h2>Are you 21?</h2>
        <div className='age-button-container'>
          <button onClick={() => ageVerification(true)} className='yes-button'>
            Yes
          </button>
          <button onClick={() => ageVerification(false)} className='no-button'>
            No
          </button>
        </div>
        <p>Brew Buddy is for individuals of legal drinking age.</p>
      </div>
    </div>
  );
}

export default AgeCheck;
