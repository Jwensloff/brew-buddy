import './BreweryCard.scss';

function BreweryCard() {
  return <article className='breweryCard'>
    <p className='card-text name'>Name</p>
    <p className='card-text'>Address</p>
    <p className='card-text'>phone</p>
    <p className='card-text'> type</p>
    <a className='card-a'>Website</a>
    <a className='card-a'>Directions</a>
    <button className='card-btn'>fav</button>
  </article>;
}

export default BreweryCard;
