import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Transactions(){
  const [rows, setRows] = useState([]);
  useEffect(()=>{
    api.get('/finance/transactions', { params: { studentId: 'AP25110010642' } }).then(r=>setRows(r.data)).catch(()=>{});
  },[]);
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {rows.map(t => (<li key={t.id}>{t.type} {t.amount || ''} {t.metadata || ''} - {new Date(t.createdAt).toLocaleString()}</li>))}
      </ul>
    </div>
  );
}
