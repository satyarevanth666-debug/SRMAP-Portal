import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function TransportAcknowledgment(){
  const [ack, setAck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/transport/acknowledgment')
      .then(res => setAck(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading acknowledgment...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!ack) return <div>No acknowledgment available.</div>;

  return (
    <div>
      <h2>Registration Acknowledgment</h2>
      <div style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd' }}>
        <div><strong>Registration ID:</strong> {ack.id}</div>
        <div><strong>Status:</strong> {ack.status}</div>
        <div><strong>Route:</strong> {ack.route}</div>
        <div><strong>Message:</strong> {ack.message}</div>
      </div>
    </div>
  );
}
