import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function CourseRegistration(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ api.get('/academic/course-registration').then(r=>setItems(r.data)).catch(()=>{}).finally(()=>setLoading(false)); },[]);
  if(loading) return <div>Loading registrations...</div>;
  return (
    <div>
      <h2>Course Registration</h2>
      <ul>
        {items.map(i => (<li key={i.id}>{i.studentId} - Subject:{i.subjectId} ({i.semester})</li>))}
      </ul>
    </div>
  );
}
