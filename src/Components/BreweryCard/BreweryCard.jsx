import './BreweryCard.scss';

function BreweryCard({ brewery }) {
  const { name, street, phone, brewery_type, website_url, city } = brewery;
  const directionsURL = `https://www.google.com/maps/dir/${name},${street}+${city}`;

  return (
    <article className='breweryCard'>
      <p className='card-text name'>{name}</p>
      <p className='card-text'>{street}</p>
      <p className='card-text'>{phone}</p>
      <p className='card-text'>{brewery_type}</p>
      <a className='card-a' href={website_url} target='_blank' rel='noreferrer'>
        Website
      </a>
      <a
        className='card-a'
        href={directionsURL}
        target='_blank'
        rel='noreferrer'
      >
        Directions
      </a>
      <button className='card-btn'>fav</button>
    </article>
  );
}

export default BreweryCard;
