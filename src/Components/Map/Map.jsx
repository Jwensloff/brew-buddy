import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useBreweries } from '../../Context/BreweryContext';
import {useEffect, useState} from 'react'

function Map() {
  const position = [39.82, -98.57];
  const zoomLevel = 5;
  const {breweries} = useBreweries();
  const [validBreweries, setValidBreweries] = useState([])
  const [mapKey, setMapKey] = useState(0)
  
  
  useEffect(() =>{
  const filteredBreweries = breweries.filter(brewery => brewery.latitude && brewery.longitude)
    setValidBreweries(filteredBreweries)
    setMapKey(prevKey => prevKey + 1)
  },[breweries])


  const mapPoints = validBreweries.map((brewery) => {
    return (
      <Marker key={brewery.id} position={[brewery.latitude, brewery.longitude]}>
      <Popup>{brewery.name}</Popup>
      </Marker>
      )
  })

  return (
    <div className='map__container'>
      <MapContainer key={mapKey} center={validBreweries && validBreweries.length !== 0 ? [validBreweries[0].latitude, validBreweries[0].longitude] : [39.82, -98.57]} zoom={validBreweries && validBreweries.length != 0 ? 10 :zoomLevel} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {mapPoints}
      </MapContainer>
    </div> )
}

export default Map;
