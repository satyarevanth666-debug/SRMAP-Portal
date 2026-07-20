import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function SAPDetails(){
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    api.get('/sap/details', { params: { studentId: 'AP25110010642' } }).then(r=>setRows(r.data)).catch(()=>{}).finally(()=>setLoading(false));
  },[]);

  if(loading) return <div>Loading SAP details...</div>;
  return (
    <div>
      <h2>SAP Details</h2>
      <ul>
        {rows.map(r => (<li key={r.id}>{r.type} - {r.status} - {new Date(r.createdAt).toLocaleString()}</li>))}
      </ul>
    </div>
  );
}
