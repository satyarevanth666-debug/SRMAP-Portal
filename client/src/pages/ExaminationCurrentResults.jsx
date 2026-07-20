import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ExaminationCurrentResults(){
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/exam/current-results')
      .then(res => setResults(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = results.filter(row => row.subject?.toLowerCase().includes(search.toLowerCase()) || row.result?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2>Current Semester Results</h2>
      <div style={{ marginBottom: 16 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search subject or result" style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc' }} />
      </div>
      {loading && <div>Loading current results...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && filtered.length === 0 && <div>No results available.</div>}
      {!loading && !error && filtered.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd' }}>Subject</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd' }}>Result</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd' }}>Credits</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd' }}>GPA</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ddd' }}>PDF</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id}>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.subject}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.result}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.credits}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{row.gpa}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #eee' }}><button style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: '#2774e0', color: '#fff' }}>Download PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
