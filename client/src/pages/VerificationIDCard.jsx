import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function VerificationIDCard(){
  const [idCard, setIdCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/verification/id-card')
      .then(res => setIdCard(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading ID card verification...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!idCard) return <div>No ID card verification data available.</div>;

  return (
    <div>
      <h2>ID Card Verification</h2>
      <div style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd', background: '#fff' }}>
        <div><strong>Status:</strong> {idCard.status}</div>
        <div><strong>Verified On:</strong> {idCard.verifiedOn}</div>
        <button style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2774e0', color: '#fff' }}>Download ID Card</button>
      </div>
    </div>
  );
}
