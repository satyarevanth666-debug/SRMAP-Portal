import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function VerificationBonafide(){
  const [bonafide, setBonafide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/verification/bonafide')
      .then(res => setBonafide(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading bonafide certificate status...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!bonafide) return <div>No bonafide certificate data available.</div>;

  return (
    <div>
      <h2>Bonafide Certificate</h2>
      <div style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd', background: '#fff' }}>
        <div><strong>Status:</strong> {bonafide.status}</div>
        <div><strong>Issued:</strong> {bonafide.issuedAt}</div>
        <button style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2774e0', color: '#fff' }}>Download Bonafide</button>
      </div>
    </div>
  );
}
