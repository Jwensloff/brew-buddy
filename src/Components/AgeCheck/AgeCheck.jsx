import './AgeCheck.scss'
import {useState} from 'react'

function AgeCheck(){
    const [isLegal, setisLegal] = useState(null);


    return (
        <div className='age-check-overlay'>
            <div className='age-check-circle'>
                <h2>Are you 21?</h2>
                <div className='age-button-container'>
                    <button className='yes-button'>Yes</button>
                    <button className='no-button'>No</button>
                </div>
                <p>Brew Buddy is for individuals of legal drinking age.</p>
            </div>
        </div>
    )
}


export default AgeCheck