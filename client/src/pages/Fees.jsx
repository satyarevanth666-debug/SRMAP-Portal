import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Fees(){
  const [fees, setFees] = useState([]);
  useEffect(()=>{
    api.get('/finance/fees').then(r=>setFees(r.data)).catch(()=>{});
  },[]);
  return (
    <div>
      <h2>Fees</h2>
      <ul>
        {fees.map(f => (<li key={f.id}>{f.code} - {f.title} - {f.amount}</li>))}
      </ul>
    </div>
  );
}
