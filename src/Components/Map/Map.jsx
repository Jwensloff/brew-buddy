import './Map.scss';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types'
import { useBreweries } from '../../Context/BreweryContext';
import { useFavorites } from '../../Context/FavoriteContext';

function Map() {
  const defaultPosition = [39.82, -98.57];
  const defaultZoomLevel = 4;
  const {
    breweries,
    selectedBrewery,
    isSelected,
    setContextSelected,
    setIsSelected,
  } = useBreweries();
  const { filteredBreweries } = useFavorites();
  const [validBreweries, setValidBreweries] = useState([]);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    setValidBreweries(filteredBreweries);
    if (filteredBreweries.length >= 2 && mapRef.current && !isSelected) {
      const distanceObject = calculateFurthestDistance(filteredBreweries);
      let cornerA = L.latLng(distanceObject.corner1);
      let cornerB = L.latLng(distanceObject.corner2);
      let bounds = L.latLngBounds(cornerA, cornerB);
      mapRef.current.flyToBounds(bounds);
    } else if (mapRef.current && filteredBreweries.length === 1) {
      mapRef.current.flyTo(
        [filteredBreweries[0].latitude, filteredBreweries[0].longitude],
        14,
      );
    }
    else if(mapRef.current && filteredBreweries.length === 1){
      mapRef.current.flyTo([filteredBreweries[0].latitude,filteredBreweries[0].longitude], 14)
    }
  }, [filteredBreweries, mapRef.current, isSelected]);

  useEffect(() => {
    if (isSelected && mapRef.current) {
      const selectedBrew = breweries.filter(
        brewery => brewery.id === selectedBrewery,
      );
      mapRef.current.flyTo(
        [selectedBrew[0].latitude, selectedBrew[0].longitude],
        14,
      );
    }
    if (selectedBrewery && Object.keys(markersRef.current).length !== 0) {
      markersRef.current[selectedBrewery].openPopup();
    }
  }, [selectedBrewery]);

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

  function zoomToBrewery({ lat, lng }) {
    mapRef.current.flyTo([lat, lng], 15);
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

  function showSelectedBeweryCard(breweryName) {
    const index = breweries.findIndex(brewery => brewery.name === breweryName);
    const brewCopy = [...breweries];
    const selectBrewery = brewCopy.splice(index, 1);
    setContextSelected(selectBrewery[0].id);
    setIsSelected(true);
  }

  const mapPoints = validBreweries.map((brewery) => {
    let formattedNumber;
    if (brewery.phone) {
      const strNum = brewery.phone;
      formattedNumber = `(${strNum.substring(0, 3)}) ${strNum.substring(
        3,
        6,
      )}-${strNum.substring(6, 10)}`;
    }

    return (
      <Marker
        ref={ref => (markersRef.current[brewery.id] = ref)}
        key={brewery.id}
        id={brewery.id}
        position={[brewery.latitude, brewery.longitude]}
        eventHandlers={{
          click: e => {
            showSelectedBeweryCard(
              e.target._popup.options.children.props.children[0].props.children,
            );
            zoomToBrewery(e.target._latlng);
          },
        }}
      >
        <Popup>
          <div className='brewery-popup'>
            <p>{brewery.name}</p>
            <p>{brewery.address_1}</p>
            <p>{formattedNumber}</p>
          </div>
        </Popup>
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

useBreweries.propTypes = {
  breweries: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedBrewery: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setContextSelected: PropTypes.func.isRequired,
  setIsSelected: PropTypes.func.isRequired
}

useFavorites.propTypes = {
  filteredBreweries: PropTypes.arrayOf(PropTypes.object).isRequired
}