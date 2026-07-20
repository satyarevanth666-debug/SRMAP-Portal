import React, { useState } from 'react';
import api from '../services/api';

export default function Withdraw(){
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await api.post('/sap/withdraw', { studentId: 'AP25110010642', reason, type: 'withdraw' });
      setMessage('Submitted');
    }catch(e){ setMessage('Failed: '+e.message); }
    setLoading(false);
  };

  return (
    <div>
      <h2>Withdraw</h2>
      <form onSubmit={submit}>
        <div>
          <label>Reason</label><br />
          <textarea value={reason} onChange={e=>setReason(e.target.value)} rows={6} cols={60}></textarea>
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading}>Submit</button>
        </div>
      </form>
      {message && <div style={{marginTop:8}}>{message}</div>}
    </div>
  );
}
