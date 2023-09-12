import './AgeCheck.scss';
import { useState } from 'react';

function AgeCheck({ setisLegal }) {
  const ageVerification = (canAccessSite) => {
    localStorage.setItem('isLegal', JSON.stringify(true));
    setisLegal(true);
  };

  return (
    <div className='age-check-overlay'>
      <div className='age-check-wrapper'>
        <h2 className='content'>Are you 21?</h2>
        <div className='age-button-container'>
          <button onClick={() => ageVerification(true)} className='yes-button content'>
            Yes
          </button>
        </div>
        <p className='content'>Brew Buddy is for individuals of legal drinking age.</p>
      </div>
    </div>
  );
}

export default AgeCheck;
