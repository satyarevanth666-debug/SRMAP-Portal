import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Events(){
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState(false);

  useEffect(()=>{
    api.get('/events').then(r=>setEvents(r.data)).catch(e=>setError(e.message)).finally(()=>setLoading(false));
  },[]);

  const register = async (id) => {
    setRegistering(true);
    try{
      await api.post('/events/register', { eventId: id, student: 'AP25110010642' });
      alert('Registered');
    }catch(e){ alert('Failed: '+ (e.message || e)); }
    setRegistering(false);
  };

  if(loading) return <div>Loading events...</div>;
  if(error) return <div style={{color:'red'}}>Error: {error}</div>;

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(ev => (
          <li key={ev.id} style={{marginBottom:10}}>
            <strong>{ev.title}</strong> — {new Date(ev.date).toLocaleString()}
            <div><button onClick={()=>register(ev.id)} disabled={registering}>Register</button></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
