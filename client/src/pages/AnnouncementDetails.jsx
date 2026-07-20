import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';

export default function AnnouncementDetails(){
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/announcements/${id}`)
      .then(res => setItem(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading announcement...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!item) return <div>Announcement not found.</div>;

  return (
    <div>
      <h2>{item.title}</h2>
      <div style={{ color: '#555', marginBottom: 16 }}>{new Date(item.createdAt).toLocaleDateString()}</div>
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{item.content}</div>
    </div>
  );
}
