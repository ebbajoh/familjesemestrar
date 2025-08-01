import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import trips from '../data/trips.json';
import 'leaflet/dist/leaflet.css';

export default function MapView() {
  // Endast resor med både latitude och longitude
  const tripsWithCoords = trips.filter(trip => trip.latitude != null && trip.longitude != null);

  return (
    <MapContainer center={[59.3293, 18.0686]} zoom={3} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {tripsWithCoords.map((trip, index) => (
        <Marker key={index} position={[trip.latitude, trip.longitude]}>
          <Popup>
            {trip.plats}, {trip.land} ({trip.ar})
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
