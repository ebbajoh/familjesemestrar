import trips from '../data/trips.json';

export default function Timeline() {
  const sortedTrips = trips.sort((a, b) => a.ar - b.ar);

  return (
    <div>
      <h2>Tidslinje</h2>
      <ul>
        {sortedTrips.map((trip, index) => (
          <li key={index}>
            {trip.ar} - {trip.manad} : {trip.plats}, {trip.land}
          </li>
        ))}
      </ul>
    </div>
  );
}
