import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function HostelBooking(){
  const [hostels, setHostels] = useState([]);
  const [room, setRoom] = useState('');
  const [studentId, setStudentId] = useState('AP25110010642');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    api.get('/hostel/hostels')
      .then(res => setHostels(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const book = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/hostel/book', { studentId, roomId: parseInt(room) });
      setSuccess('Hostel booking requested successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Hostel Booking</h2>
      {loading && <div>Loading hostels...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && hostels.length === 0 && <div>No hostels available.</div>}
      {!loading && !error && hostels.length > 0 && (
        <div style={{ display: 'grid', gap: 16 }}>
          {hostels.map(item => (
            <div key={item.id} style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd' }}>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div>{item.address}</div>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={book} style={{ marginTop: 24, display: 'grid', gap: 16, maxWidth: 500 }}>
        <input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="Student ID" required style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
        <select value={room} onChange={e => setRoom(e.target.value)} required style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }}>
          <option value="">Select room id</option>
          {hostels.map(item => (<option key={item.id} value={item.id}>{item.name}</option>))}
        </select>
        <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 8, border: 'none', background: '#2774e0', color: '#fff' }}>Book Now</button>
      </form>
      {success && <div style={{ marginTop: 16, color: 'green' }}>{success}</div>}
    </div>
  );
}
