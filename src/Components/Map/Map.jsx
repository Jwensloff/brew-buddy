import './Map.scss';
// import { MapContainer, TileLayer } from "react-leaflet";

import { MapContainer, TileLayer } from "react-leaflet";
 
function Map() {
  const position = [39.82, -98.57]; // [latitude, longitude]
  const zoomLevel = 4;
 
  return (
        <div className="map__container">

    <MapContainer 
        center={position} 
        zoom={zoomLevel} 
        scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
        </div>

  );
};

export default Map;







// function Map() {
//   const defaultPosition: LatLngExpression = [48.864716, 2.349]; // Paris position

//   return (
//     <div className="map__container">
//       <MapContainer
//         center={defaultPosition}
//         zoom={13}
//       >
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       </MapContainer>
//     </div>
//   );}

// export default Map;
