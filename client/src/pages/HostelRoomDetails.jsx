import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function HostelRoomDetails(){
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/hostel/room')
      .then(res => setRooms(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Room Details</h2>
      {loading && <div>Loading room details...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && rooms.length === 0 && <div>No rooms found.</div>}
      {!loading && !error && rooms.length > 0 && (
        <div style={{ display: 'grid', gap: 16 }}>
          {rooms.map(room => (
            <div key={room.id} style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd' }}>
              <div><strong>Room</strong> {room.number}</div>
              <div><strong>Hostel ID</strong> {room.hostelId}</div>
              <div><strong>Capacity</strong> {room.capacity}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
