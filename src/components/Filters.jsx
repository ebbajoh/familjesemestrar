import { useState } from 'react';
import trips from '../data/trips.json';

export default function Filters({ onFilter }) {
  // Lista unika år och personer
  const years = [...new Set(trips.map(trip => trip.ar))];
  const people = [...new Set(trips.map(trip => trip.med_vilka).filter(Boolean))];

  return (
    <div>
      <h2>Filter</h2>
      <select onChange={e => onFilter('year', e.target.value)}>
        <option value="">Alla år</option>
        {years.map((year, idx) => <option key={idx} value={year}>{year}</option>)}
      </select>

      <select onChange={e => onFilter('person', e.target.value)}>
        <option value="">Alla personer</option>
        {people.map((person, idx) => <option key={idx} value={person}>{person}</option>)}
      </select>
    </div>
  );
}
