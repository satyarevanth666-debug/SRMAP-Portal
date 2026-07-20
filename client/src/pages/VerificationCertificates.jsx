import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function VerificationCertificates(){
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/verification/certificates')
      .then(res => setCerts(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading certificates...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (certs.length === 0) return <div>No certificates available.</div>;

  return (
    <div>
      <h2>Certificates</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        {certs.map(cert => (
          <div key={cert.id} style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd', background: '#fff' }}>
            <div style={{ fontWeight: 'bold' }}>{cert.title}</div>
            <div>{cert.status}</div>
            <button style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2774e0', color: '#fff' }}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
