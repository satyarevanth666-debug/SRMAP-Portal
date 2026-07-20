import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function HostelRules(){
  const [rules, setRules] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/hostel/rules')
      .then(res => setRules(res.data.rules || 'No rules found.'))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Hostel Rules & Regulations</h2>
      {loading && <div>Loading rules...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{rules}</div>}
    </div>
  );
}
