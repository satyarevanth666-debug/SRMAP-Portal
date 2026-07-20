import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function SAPAttachments(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    api.get('/sap/attachments').then(r=>setList(r.data)).catch(()=>{}).finally(()=>setLoading(false));
  },[]);

  if(loading) return <div>Loading attachments...</div>;
  return (
    <div>
      <h2>SAP Attachments</h2>
      <ul>
        {list.map(a => (<li key={a.id}>{a.filename} - {a.url || 'no url'}</li>))}
      </ul>
    </div>
  );
}
