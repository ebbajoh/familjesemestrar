import { useEffect, useState } from 'react';
import logga from './assets/logga.png';
import tripsData from './data/trips.json';
import Statistics from './components/Statistics';
import NextTrip from './components/NextTrip';
import Quiz from './components/Quiz';

import visaStatistikIcon from './assets/VisaStatetisk.png';
import nästaSemesterIcon from './assets/NästaSemester.png';
import quizKnappIcon from './assets/quizKnapp.png';
import allaSemestrarIcon from './assets/allaSemestrar.png';
import läggTillSemesterIcon from './assets/läggTillSemester.png';


function App() {
  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [filteredTrips, setFilteredTrips] = useState(tripsData);
  const [showForm, setShowForm] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showNextTrip, setShowNextTrip] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [newTrip, setNewTrip] = useState({
    ar: '',
    manad: '',
    plats: '',
    land: '',
    med_vilka: '',
    kommentar: '',
  });

  const people = [...new Set(tripsData.map(t => t.med_vilka).filter(Boolean))];
  const places = [...new Set(tripsData.map(t => t.plats).filter(Boolean))];

  useEffect(() => {
    const filtered = tripsData.filter(trip => {
      const matchQuery = query === '' || Object.values(trip).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(query.toLowerCase())
      );
      const matchPerson = selectedPerson === '' || trip.med_vilka === selectedPerson;
      const matchPlace = selectedPlace === '' || trip.plats === selectedPlace;

      return matchQuery && matchPerson && matchPlace;
    });

    setFilteredTrips(filtered);
  }, [query, selectedPerson, selectedPlace]);

  const handleAddTrip = () => {
    const updated = [...filteredTrips, newTrip];
    setFilteredTrips(updated);
    setShowForm(false);
    setNewTrip({ ar: '', manad: '', plats: '', land: '', med_vilka: '', kommentar: '' });
  };

  return (
    <div className="App">
      <header style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <img
          src={logga}
          alt="Familjesemestrar"
          style={{
            height: '310px',
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
      </header>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>

          {/* BILDKNAPPAR */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img
              src={visaStatistikIcon}
              alt="Visa statistik"
              onClick={() => {
                setShowStatistics(!showStatistics);
                setShowNextTrip(false);
                setShowQuiz(false);
              }}
              style={{
                height: '45px',
                cursor: 'pointer',
                borderRadius: '32px',
                transition: 'transform 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            />

            <img
              src={nästaSemesterIcon}
              alt="Nästa semester"
              onClick={() => {
                setShowNextTrip(!showNextTrip);
                setShowStatistics(false);
                setShowQuiz(false);
              }}
              style={{
                height: '65px',
                cursor: 'pointer',
                borderRadius: '30px',
                transition: 'transform 0.2s',
                marginTop: '-9px',
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            />

            <img
              src={allaSemestrarIcon}
              alt="Till startsidan"
              onClick={() => {
                setShowQuiz(false);
                setShowStatistics(false);
                setShowNextTrip(false);
              }}
              style={{
                height: '45px',
                cursor: 'pointer',
                borderRadius: '32px',
                transition: 'transform 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            />

            <img
              src={quizKnappIcon}
              alt="Quiz"
              onClick={() => {
                setShowQuiz(!showQuiz);
                setShowStatistics(false);
                setShowNextTrip(false);
              }}
              style={{
                height: '45px',
                cursor: 'pointer',
                borderRadius: '32px',
                transition: 'transform 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>

          {/* INNEHÅLLSLOGIK */}
          {showQuiz ? (
            <Quiz />
          ) : showStatistics ? (
            <Statistics />
          ) : showNextTrip ? (
            <NextTrip />
          ) : (
            <>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <input
                  type="text"
                  placeholder="Sök efter plats, år, kommentar..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{ padding: '0.5rem', width: '200%', maxWidth: '700px', marginTop: '15px', }}
                />

                {/* FILTRERA-RUBRIK */}
             <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ fontWeight: 'bold' }}>Filtrera:</span>

                  <select
                    value={selectedPerson}
                    onChange={e => setSelectedPerson(e.target.value)}
                    style={{ maxWidth: '220px', padding: '0.4rem' }}
                  >
                    <option value="">Alla personer</option>
                    {people.map((p, i) => <option key={i} value={p}>{p}</option>)}
                  </select>

                  <select
                    value={selectedPlace}
                    onChange={e => setSelectedPlace(e.target.value)}
                    style={{ maxWidth: '220px', padding: '0.4rem' }}
                  >
                    <option value="">Alla platser</option>
                    {places.map((pl, i) => <option key={i} value={pl}>{pl}</option>)}
                  </select>
                </div>


                   <img
                  src={läggTillSemesterIcon}
                  alt="Lägg till semester"
                  onClick={() => setShowForm(!showForm)}
                  style={{
                    height: '37px',
                    cursor: 'pointer',
                    borderRadius: '32px',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                />

              </div>

              {showForm && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <input placeholder="År" value={newTrip.ar} onChange={e => setNewTrip({ ...newTrip, ar: e.target.value })} />
                  <input placeholder="Månad" value={newTrip.manad} onChange={e => setNewTrip({ ...newTrip, manad: e.target.value })} />
                  <input placeholder="Plats" value={newTrip.plats} onChange={e => setNewTrip({ ...newTrip, plats: e.target.value })} />
                  <input placeholder="Land" value={newTrip.land} onChange={e => setNewTrip({ ...newTrip, land: e.target.value })} />
                  <input placeholder="Med vilka" value={newTrip.med_vilka} onChange={e => setNewTrip({ ...newTrip, med_vilka: e.target.value })} />
                  <input placeholder="Kommentar" value={newTrip.kommentar} onChange={e => setNewTrip({ ...newTrip, kommentar: e.target.value })} />
                  <button className="button" onClick={handleAddTrip}>Spara</button>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ul style={{ listStyle: 'none', padding: 0, width: '100%', maxWidth: '600px' }}>
                  {filteredTrips.map((trip, index) => (
                    <li key={index} style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                      <strong>{trip.ar} - {trip.manad}</strong><br />
                      {trip.plats}, {trip.land}<br />
                      <em>{trip.med_vilka}</em><br />
                      {trip.kommentar}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
