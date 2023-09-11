import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup, Pane } from 'react-leaflet';
import { useBreweries } from '../../Context/BreweryContext';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { useFavorites } from '../../Context/FavoriteContext';

function Map() {
  const defaultPosition = [39.82, -98.57];
  const defaultZoomLevel = 4;
  const { breweries } = useBreweries();
  const { getFilteredBreweries , favorites, favoriteFilter} = useFavorites()
  const [validBreweries, setValidBreweries] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const filteredBreweries = getFilteredBreweries().filter(
      brewery => brewery.latitude && brewery.longitude,
    );
    setValidBreweries(filteredBreweries);
    if (filteredBreweries.length > 0 && mapRef.current) {
      const center = calculateCenter(filteredBreweries);
      const distanceObject = calculateFurthestDistance(filteredBreweries);
      let cornerA = L.latLng(distanceObject.corner1);
      let cornerB = L.latLng(distanceObject.corner2);
      let bounds = L.latLngBounds(cornerA, cornerB);
      mapRef.current.flyToBounds(bounds);
    }
  }, [breweries, favorites, favoriteFilter]);

  function calculateCenter(filteredBreweries) {
    let longSum = 0;
    let latSum = 0;
    filteredBreweries.forEach(brewery => {
      latSum += Number(brewery.latitude);
      longSum += Number(brewery.longitude);
    });

    let mapCenter = {
      latCenter: latSum / filteredBreweries.length,
      longCenter: longSum / filteredBreweries.length,
    };
    return mapCenter;
  }

  function calculateFurthestDistance(filteredBreweries) {
    let largestDistance = filteredBreweries.reduce(
      (acc, currentBrewery, index) => {
        filteredBreweries.slice(index + 1).forEach(brewery => {
          let distance = calculateDistance(
            currentBrewery.latitude,
            currentBrewery.longitude,
            brewery.latitude,
            brewery.longitude,
          );
          if (distance > acc.distance) {
            acc.distance = distance;
            acc.corner1 = [currentBrewery.latitude, currentBrewery.longitude];
            acc.corner2 = [brewery.latitude, brewery.longitude];
          }
        });
        return acc;
      },
      { distance: 0, corner1: [], corner2: [] },
    );
    return largestDistance;
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
          Math.cos(latRad1) * Math.cos(latRad2) * Math.cos(longRad2 - longRad1),
      );
    return distance;
  }

  const mapPoints = validBreweries.map(brewery => {
    return (
      <Marker key={brewery.id} position={[brewery.latitude, brewery.longitude]}>
        <Popup>{brewery.name}</Popup>
      </Marker>
    );
  });

  return (
    <div className='map__container'>
      <MapContainer
        ref={mapRef}
        center={defaultPosition}
        zoom={defaultZoomLevel}
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
