import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Timetable(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    api.get('/academic/timetable').then(r=>{ setItems(r.data); }).catch(()=>{}).finally(()=>setLoading(false));
  },[]);

  if(loading) return <div>Loading timetable...</div>;
  return (
    <div>
      <h2>Timetable</h2>
      <ul>
        {items.map(it => (<li key={it.id}>{it.day} {it.startTime}-{it.endTime} (Sub: {it.subjectId})</li>))}
      </ul>
    </div>
  );
}
