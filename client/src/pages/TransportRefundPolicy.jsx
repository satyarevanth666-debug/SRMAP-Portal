import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function TransportRefundPolicy(){
  const [policy, setPolicy] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/transport/refund-policy')
      .then(res => setPolicy(res.data.policy || 'No refund policy available.'))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Transport Refund Policy</h2>
      {loading && <div>Loading refund policy...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{policy}</div>}
    </div>
  );
}
