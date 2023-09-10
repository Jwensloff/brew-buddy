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
   
    let mapCenter = {
      latCenter : latSum/(filteredBreweries.length),
      longCenter : longSum/(filteredBreweries.length)
    }
    return mapCenter;
  }
  
  function caclulateFurthestDistance(filteredBreweries){

    let largestDistance = filteredBreweries.reduce((acc, currentBrewery, index) => {
        for( var i = index + 1 ; i < filteredBreweries.length; i++) {
          
          let distance = calculateDistance(currentBrewery.latitude,currentBrewery.longitude,filteredBreweries[i].latitude,filteredBreweries[i].longitude)
          
          if(distance > acc){
            console.log(acc)
            acc = distance;
          }
        }
        return acc;
    },0)
    return largestDistance;
  }




  function calculateDistance (lat1,long1,lat2,long2){
    console.log(lat1,long1,lat2,long2)
    let latRad1 = (Number(lat1) * Math.PI)/180
    let latRad2 = (Number(lat2) * Math.PI)/180
    let longRad1 = (Number(long1) * Math.PI)/180
    let longRad2 = (Number(long2) * Math.PI)/180
    const distance = 3958*(Math.acos((Math.sin(latRad1)*Math.sin(latRad2)) + (Math.cos(latRad1)*Math.cos(latRad2)*Math.cos(longRad2 - longRad1))));
    
    return distance;
  }
  calculateDistance();



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

