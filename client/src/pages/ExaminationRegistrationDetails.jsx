import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ExaminationRegistrationDetails(){
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/exam/registration-details')
      .then(res => setDetails(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading registration details...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!details || details.length === 0) return <div>No registration details available.</div>;

  return (
    <div>
      <h2>Exam Registration Details</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        {details.map(item => (
          <div key={item.id} style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd', background: '#fff' }}>
            <div><strong>Exam:</strong> {item.exam}</div>
            <div><strong>Subject:</strong> {item.subject}</div>
            <div><strong>Semester:</strong> {item.semester}</div>
            <div><strong>Status:</strong> {item.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
