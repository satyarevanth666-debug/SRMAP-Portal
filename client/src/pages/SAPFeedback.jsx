import React, { useState } from 'react';
import api from '../services/api';

export default function SAPFeedback(){
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try{
      await api.post('/sap/feedback', { studentId: 'AP25110010642', message });
      setStatus('Submitted');
    }catch(e){ setStatus('Failed: '+e.message); }
  };

  return (
    <div>
      <h2>SAP Feedback</h2>
      <form onSubmit={submit}>
        <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={6} cols={60}></textarea>
        <br />
        <button type="submit">Send</button>
      </form>
      {status && <div style={{marginTop:8}}>{status}</div>}
    </div>
  );
}
