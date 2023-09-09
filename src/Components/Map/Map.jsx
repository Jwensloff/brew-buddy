import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup, Pane} from 'react-leaflet';
import { useBreweries } from '../../Context/BreweryContext';
import {useEffect, useState, useRef} from 'react'

function Map() {
  const defaultposition = [39.82, -98.57];
  const defaultzoomLevel = 4;
  const {breweries} = useBreweries();
  const [validBreweries, setValidBreweries] = useState([]);
  const mapRef = useRef(null);
  
  
  useEffect(() =>{
  const filteredBreweries = breweries.filter(brewery => brewery.latitude && brewery.longitude)
    console.log("Filtered breweries", filteredBreweries)
    setValidBreweries(filteredBreweries)
    if(filteredBreweries.length > 0 && mapRef.current){
      const center = calculateCenter(filteredBreweries)
      mapRef.current.flyTo([center.latCenter,center.longCenter], 10)
      
    }
    
  },[breweries])

  function calculateCenter (filteredBreweries){
    let longSum = 0;
    let latSum = 0;
    filteredBreweries.forEach(brewery => {
      latSum += Number(brewery.latitude);
      longSum += Number(brewery.longitude);
    })
    console.log("LONG SUM",longSum)
    console.log("LAT SUM", latSum)
    let mapCenter = {
      latCenter : latSum/(filteredBreweries.length),
      longCenter : longSum/(filteredBreweries.length)
    }
    return mapCenter;
  }


  const mapPoints = validBreweries.map((brewery) => {
    return (
      <Marker key={brewery.id} position={[brewery.latitude, brewery.longitude]}>
      <Popup>{brewery.name}</Popup>
      </Marker>
      )
  })

  return (
    <div className='map__container'>
      <MapContainer  ref={mapRef} center={validBreweries.length !== 0 ? [validBreweries[0].latitude, validBreweries[0].longitude] : defaultposition} zoom={validBreweries.length != 0 ? 15 : defaultzoomLevel} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {mapPoints}
      </MapContainer>
    </div> )
}

export default Map;

