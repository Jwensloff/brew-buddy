import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
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
    userLocation,
    obtainBreweries,
    locationError,
  } = useBreweries();
  const { filteredBreweries } = useFavorites();
  const [validBreweries, setValidBreweries] = useState([]);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    setValidBreweries(filteredBreweries);
    if (filteredBreweries.length >= 2 && mapRef.current && !isSelected) {
      const bounds = findCorners(filteredBreweries);
      mapRef.current.flyToBounds([bounds.northEast, bounds.southWest], {
        duration: 1,
        easeLinearity: 0.1,
      });
    } else if (mapRef.current && filteredBreweries.length === 1) {
      mapRef.current.flyTo(
        [filteredBreweries[0].latitude, filteredBreweries[0].longitude],
        14,
      );
    } else if (mapRef.current && filteredBreweries.length === 1) {
      mapRef.current.flyTo(
        [filteredBreweries[0].latitude, filteredBreweries[0].longitude],
        14,
      );
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

  function findCorners(filteredBreweries) {
    const corners = filteredBreweries.reduce((acc, currentBrewery) => {
      const lat = currentBrewery.latitude;
      const long = currentBrewery.longitude;
      if (Object.keys(acc).length === 0) {
        return {
          maxLat: lat,
          minLat: lat,
          maxLong: long,
          minLong: long,
        };
      }

      return {
        maxLat: Math.max(acc.maxLat, lat),
        minLat: Math.min(acc.minLat, lat),
        maxLong: Math.max(acc.maxLong, long),
        minLong: Math.min(acc.minLong, long),
      };
    }, {});

    let northEast = [corners.maxLat, corners.maxLong];
    let southWest = [corners.minLat, corners.minLong];
    return { northEast, southWest };
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

  const mapPoints = validBreweries.map(brewery => {
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
    <div className='map-container'>
      <button
        className='search-by-user-location-btn'
        disabled={!userLocation.length}
        onClick={() => {
          obtainBreweries(undefined, undefined, userLocation);
        }}
      >
        Near Me
      </button>
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
  setIsSelected: PropTypes.func.isRequired,
};

useFavorites.propTypes = {
  filteredBreweries: PropTypes.arrayOf(PropTypes.object).isRequired,
};
