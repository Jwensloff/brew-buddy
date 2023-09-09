import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useBreweries } from '../../Context/BreweryContext';

function Map() {
  const position = [39.82, -98.57]; // [latitude, longitude]
  const zoomLevel = 10;
  const {breweries} = useBreweries();
  console.log("Breweries:",breweries)

  
  

  const breweryPins = breweries.map((brewery) => {
    console.log('LAT:',brewery.latitude)
    console.log("LonG:", brewery.longitude)
    if(brewery.latitude && brewery.longitude){
      console.log("TEST")
    return <Marker key={brewery.id} position={[brewery.latitude, brewery.longitude]}>
      <Popup>{brewery.name}</Popup>
    </Marker>
    }
  }
  )
  console.log("PINS:", breweryPins)

  return (
    breweries && (
    <div className='map__container'>
      <MapContainer center={['39.7614','-104.9839']} zoom={zoomLevel} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {breweryPins}
      
      </MapContainer>
    </div> )) ||  null
  
}

export default Map;
