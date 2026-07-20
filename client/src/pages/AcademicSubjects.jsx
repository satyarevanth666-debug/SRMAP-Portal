import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AcademicSubjects(){
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    let mounted = true;
    setLoading(true);
    api.get('/academic/subjects')
      .then(res => { if(mounted) setSubjects(res.data); })
      .catch(err => { if(mounted) setError(err.message); })
      .finally(()=> { if(mounted) setLoading(false); });
    return ()=> mounted = false;
  },[]);

  if(loading) return <div>Loading subjects...</div>;
  if(error) return <div style={{color:'red'}}>Error: {error}</div>;

  return (
    <div>
      <h2>Student Wise Subjects</h2>
      <ul>
        {subjects.map(s => (
          <li key={s.id}>{s.code} - {s.name} ({s.credits} cr)</li>
        ))}
      </ul>
    </div>
  );
}
