import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AttendanceDetails(){
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ api.get('/academic/attendance').then(r=>setRows(r.data)).catch(()=>{}).finally(()=>setLoading(false)); },[]);
  if(loading) return <div>Loading attendance...</div>;
  return (
    <div>
      <h2>Attendance Details</h2>
      <table>
        <thead><tr><th>Date</th><th>Present</th><th>Subject</th></tr></thead>
        <tbody>
          {rows.map(r => (<tr key={r.id}><td>{new Date(r.date).toLocaleDateString()}</td><td>{r.present? 'Yes':'No'}</td><td>{r.subjectId}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
}
