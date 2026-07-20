import React, { useState } from 'react';
import api from '../services/api';

export default function Payments(){
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try{
      await api.post('/finance/payments', { studentId: 'AP25110010642', amount: parseFloat(amount), method: 'manual', reference: 'REF-'+Date.now() });
      setStatus('Payment recorded');
    }catch(e){ setStatus('Failed: '+e.message); }
  };

  return (
    <div>
      <h2>Record Payment</h2>
      <form onSubmit={submit}>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" />
        <button type="submit">Submit</button>
      </form>
      {status && <div style={{marginTop:8}}>{status}</div>}
    </div>
  );
}
