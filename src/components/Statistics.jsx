import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import trips from '../data/trips.json';

export default function Statistics() {
  // Resor per år
  const resorPerAr = Object.entries(
    trips.reduce((acc, t) => {
      if (t.ar) acc[t.ar] = (acc[t.ar] || 0) + 1;
      return acc;
    }, {})
  ).map(([ar, count]) => ({ ar, count }));

  // Länder topp 5
  const landStat = Object.entries(
    trips.reduce((acc, t) => {
      if (t.land) acc[t.land] = (acc[t.land] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([land, count]) => ({ name: land, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Med vilka
  const personerStat = Object.entries(
    trips.reduce((acc, t) => {
      if (t.med_vilka) acc[t.med_vilka] = (acc[t.med_vilka] || 0) + 1;
      return acc;
    }, {})
  ).map(([person, count]) => ({ name: person, value: count }));

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Semesterstatistik</h2>

      <h3>Resor per år</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={resorPerAr}>
          <XAxis dataKey="ar" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Topp 5 mest besökta länder</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={landStat} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {landStat.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'][index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h3>Resor med personer</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={personerStat}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
