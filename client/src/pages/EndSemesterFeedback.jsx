import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function EndSemesterFeedback(){
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api.get('/feedback/questions')
      .then(res => setQuestions(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const setRating = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const submit = async e => {
    e.preventDefault();
    setStatus(null);
    try {
      await api.post('/feedback/submit', { responses, comments });
      setStatus('Feedback submitted successfully.');
      setComments('');
      setResponses({});
    } catch (err) {
      setStatus(err.message);
    }
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (questions.length === 0) return <div>No feedback questions available.</div>;

  return (
    <div>
      <h2>End Semester Feedback</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 16, maxWidth: 700 }}>
        {questions.map(q => (
          <div key={q.id} style={{ padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
            <div style={{ marginBottom: 8, fontWeight: 'bold' }}>{q.text}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3, 4, 5].map(value => (
                <button type="button" key={value} onClick={() => setRating(q.id, value)} style={{ flex: 1, padding: 10, borderRadius: 8, border: responses[q.id] === value ? '2px solid #2774e0' : '1px solid #ccc', background: responses[q.id] === value ? '#e6f0ff' : '#fff' }}>
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
        <textarea value={comments} onChange={e => setComments(e.target.value)} rows={5} placeholder="Additional comments" style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: 12, borderRadius: 8, border: 'none', background: '#2774e0', color: '#fff' }}>Submit Feedback</button>
      </form>
      {status && <div style={{ marginTop: 16 }}>{status}</div>}
    </div>
  );
}
