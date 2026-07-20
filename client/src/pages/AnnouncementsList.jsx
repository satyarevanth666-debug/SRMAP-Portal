import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function AnnouncementsList(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/announcements')
      .then(res => setItems(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Announcements</h2>
      {loading && <div>Loading announcements...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && items.length === 0 && <div>No announcements available.</div>}
      {!loading && !error && (
        <div style={{ display: 'grid', gap: 16 }}>
          {items.map(item => (
            <Link key={item.id} to={`/announcements/${item.id}`} style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd', textDecoration: 'none', color: 'inherit', background: '#fff' }}>
              <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{item.title}</div>
              <div style={{ color: '#555' }}>{new Date(item.createdAt).toLocaleDateString()}</div>
              <div style={{ marginTop: 8 }}>{item.content?.slice(0, 120)}...</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
