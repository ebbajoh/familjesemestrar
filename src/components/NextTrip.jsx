import { useState } from 'react';

export default function NextTrip() {
  const destinations = [
    'Florida, Cabana Bay',
  ];

  const [nextPlace, setNextPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateNextTrip = () => {
    setIsLoading(true);
    setNextPlace(null);

    setTimeout(() => {
      const random = destinations[Math.floor(Math.random() * destinations.length)];
      setNextPlace(random);
      setIsLoading(false);
    }, 1500); // 1.5 sekunders "laddning"
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🌍 Nästa semestermål</h2>
      <button onClick={generateNextTrip} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        Generera förslag
      </button>

      {isLoading && (
        <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>⏳ Genererar förslag...</p>
      )}

      {nextPlace && !isLoading && (
        <div style={{ marginTop: '2rem' }}>
          <p>Vi föreslår att ni reser till:</p>
          <h3 style={{ fontSize: '2rem', color: '#4caf50' }}>{nextPlace}</h3>
        </div>
      )}
    </div>
  );
}
