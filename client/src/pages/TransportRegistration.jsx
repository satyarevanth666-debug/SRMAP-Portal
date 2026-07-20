import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function TransportRegistration(){
  const [routes, setRoutes] = useState([]);
  const [selected, setSelected] = useState('');
  const [studentId, setStudentId] = useState('AP25110010642');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/transport/routes')
      .then(res => setRoutes(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const submit = async e => {
    e.preventDefault();
    setStatus(null);
    setError(null);
    try {
      await api.post('/transport/register', { studentId, routeId: parseInt(selected) });
      setStatus('Transport registration submitted successfully.');
      setSelected('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Transport Registration</h2>
      {loading && <div>Loading bus routes...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && (
        <div style={{ display: 'grid', gap: 16 }}>
          {routes.map(route => (
            <div key={route.id} style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd' }}>
              <div style={{ fontWeight: 'bold' }}>{route.name}</div>
              <div>{route.desc}</div>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={submit} style={{ marginTop: 24, display: 'grid', gap: 16, maxWidth: 500 }}>
        <input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="Student ID" required style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
        <select value={selected} onChange={e => setSelected(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }}>
          <option value="">Select route</option>
          {routes.map(route => (<option key={route.id} value={route.id}>{route.name}</option>))}
        </select>
        <button type="submit" style={{ padding: 12, borderRadius: 8, border: 'none', background: '#2774e0', color: '#fff' }}>Register</button>
      </form>
      {status && <div style={{ color: 'green', marginTop: 16 }}>{status}</div>}
    </div>
  );
}
