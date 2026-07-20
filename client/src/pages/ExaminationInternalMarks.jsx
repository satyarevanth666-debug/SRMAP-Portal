import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ExaminationInternalMarks(){
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/exam/internal-marks')
      .then(res => setMarks(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = marks.filter(item => item.subject?.toLowerCase().includes(search.toLowerCase()) || item.exam?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2>Internal Marks</h2>
      <div style={{ marginBottom: 16 }}>
        <input type="search" placeholder="Search by subject or exam" value={search} onChange={e=>setSearch(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc' }} />
      </div>
      {loading && <div>Loading internal marks...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && filtered.length === 0 && <div>No internal marks available.</div>}
      {!loading && !error && filtered.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #ddd' }}>Subject</th>
                <th style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #ddd' }}>Exam</th>
                <th style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #ddd' }}>Marks</th>
                <th style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #ddd' }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id}>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.subject}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.exam}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.marks}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
