import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ExaminationPreviousInternalMarks(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    api.get('/exam/previous-internal-marks')
      .then(res => setList(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = list.filter(row => row.subject?.toLowerCase().includes(subject.toLowerCase()));

  return (
    <div>
      <h2>Earlier Internal Marks</h2>
      <div style={{ marginBottom: 16 }}>
        <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Filter by subject" style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc' }} />
      </div>
      {loading && <div>Loading previous marks...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && filtered.length === 0 && <div>No previous internal marks found.</div>}
      {!loading && !error && filtered.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd' }}>Subject</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd' }}>Exam</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd' }}>Marks</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd' }}>Year</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{item.subject}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{item.exam}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{item.marks}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{item.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
