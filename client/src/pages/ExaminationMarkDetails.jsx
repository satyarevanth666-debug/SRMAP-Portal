import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ExaminationMarkDetails(){
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/exam/mark-details')
      .then(res => setDetails(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading exam mark details...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!details) return <div>No exam details available.</div>;

  return (
    <div>
      <h2>Exam Mark Details</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        {details.map(item => (
          <div key={item.id} style={{ padding: 16, borderRadius: 12, border: '1px solid #ddd', background: '#fff' }}>
            <div style={{ fontWeight: 'bold' }}>{item.subject}</div>
            <div>Date: {item.date}</div>
            <div>Marks: {item.marks}</div>
            <div>Grade: {item.grade}</div>
            <div>Remarks: {item.remarks || 'No remarks'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
