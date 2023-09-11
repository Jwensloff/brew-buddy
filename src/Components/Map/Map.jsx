import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup, Pane, useMap } from 'react-leaflet';
import { useBreweries } from '../../Context/BreweryContext';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';

function Map() {
  const defaultposition = [39.82, -98.57];
  const defaultzoomLevel = 4;
  const { breweries } = useBreweries();
  const [validBreweries, setValidBreweries] = useState([]);
  const mapRef = useRef(null);
  const [selectedBrewery, setSelectedBrewery] = useState(null);

  useEffect(() => {
    const filteredBreweries = breweries.filter(
      (brewery) => brewery.latitude && brewery.longitude
    );
    console.log('Filtered breweries', filteredBreweries);
    setValidBreweries(filteredBreweries);
    if (filteredBreweries.length > 2 && mapRef.current) {
      const center = calculateCenter(filteredBreweries);
      const distanceObject = caclulateFurthestDistance(filteredBreweries);
      let cornerA = L.latLng(distanceObject.corner1);
      let cornerB = L.latLng(distanceObject.corner2);
      let bounds = L.latLngBounds(cornerA, cornerB);
      mapRef.current.flyToBounds(bounds);
    }
    else if(mapRef.current && filteredBreweries.length === 1){
      mapRef.current.flyTo([filteredBreweries[0].latitude,filteredBreweries[0].longitude], 14)
    }
  }, [breweries]);

  function calculateCenter(filteredBreweries) {
    let longSum = 0;
    let latSum = 0;
    filteredBreweries.forEach((brewery) => {
      latSum += Number(brewery.latitude);
      longSum += Number(brewery.longitude);
    });

    let mapCenter = {
      latCenter: latSum / filteredBreweries.length,
      longCenter: longSum / filteredBreweries.length,
    };
    return mapCenter;
  }

  function caclulateFurthestDistance(filteredBreweries) {
    let largestDistance = filteredBreweries.reduce(
      (acc, currentBrewery, index) => {
        filteredBreweries.slice(index + 1).forEach((brewery) => {
          let distance = calculateDistance(
            currentBrewery.latitude,
            currentBrewery.longitude,
            brewery.latitude,
            brewery.longitude
          );
          if (distance > acc.distance) {
            acc.distance = distance;
            acc.corner1 = [currentBrewery.latitude, currentBrewery.longitude];
            acc.corner2 = [brewery.latitude, brewery.longitude];
          }
        });
        return acc;
      },
      { distance: 0, corner1: [], corner2: [] }
    );
    return largestDistance;
  }

  function zoomToBrewery({lat,lng}){
    mapRef.current.flyTo([lat,lng],15)
  }

  function calculateDistance(lat1, long1, lat2, long2) {
   
    let latRad1 = (Number(lat1) * Math.PI) / 180;
    let latRad2 = (Number(lat2) * Math.PI) / 180;
    let longRad1 = (Number(long1) * Math.PI) / 180;
    let longRad2 = (Number(long2) * Math.PI) / 180;
    const distance =
      3958 *
      Math.acos(
        Math.sin(latRad1) * Math.sin(latRad2) +
          Math.cos(latRad1) * Math.cos(latRad2) * Math.cos(longRad2 - longRad1)
      );
    return distance;
  }

 
  const mapPoints = validBreweries.map((brewery) => {
    let formattedNumber;
    if(brewery.phone){
    const strNum = brewery.phone;
    
    formattedNumber = `(${strNum.substring(0, 3)}) ${strNum.substring(3, 6)}-${strNum.substring(6, 10)}`
    }
    
    return (
      <Marker key={brewery.id} position={[brewery.latitude, brewery.longitude]} eventHandlers={{click: (e) => {zoomToBrewery(e.target._latlng)}}}>
        <Popup>
          <div className='brewery-popup'>
            <p>{brewery.name}</p>
            <p>{brewery.address_1}</p>
            <p>{formattedNumber}</p>
            </div></Popup>
      </Marker>
    );
  });

  return (
    <div className='map__container'>
      <MapContainer
        ref={mapRef}
        center={
          validBreweries.length !== 0
            ? [validBreweries[0].latitude, validBreweries[0].longitude]
            : defaultposition
        }
        zoom={validBreweries.length != 0 ? 15 : defaultzoomLevel}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {mapPoints}
      </MapContainer>
    </div>
  );
}

export default Map;
