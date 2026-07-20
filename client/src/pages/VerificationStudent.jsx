import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function VerificationStudent(){
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/verification/student')
      .then(res => setStatus(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading verification status...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!status) return <div>No verification data available.</div>;

  return (
    <div>
      <h2>Student Verification</h2>
      <div style={{ display: 'grid', gap: 12, maxWidth: 600 }}>
        {Object.entries(status).map(([key, value]) => (
          <div key={key} style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd', background: '#fff' }}>
            <div style={{ fontWeight: 'bold' }}>{key}</div>
            <div>{String(value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
