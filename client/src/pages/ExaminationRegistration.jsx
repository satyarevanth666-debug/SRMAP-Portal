import React, { useState } from 'react';
import api from '../services/api';

export default function ExaminationRegistration(){
  const [form, setForm] = useState({ exam: '', subject: '', semester: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post('/exam/register', form);
      setStatus('Registration submitted successfully');
      setForm({ exam: '', subject: '', semester: '' });
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Exam Registration</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 16, maxWidth: 600 }}>
        <input value={form.exam} onChange={e => setForm({ ...form, exam: e.target.value })} placeholder="Exam name" required style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
        <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Subject" required style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
        <input value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })} placeholder="Semester" required style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
        <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 8, border: 'none', background: '#2774e0', color: '#fff' }}>{loading ? 'Submitting...' : 'Register'}</button>
      </form>
      {status && <div style={{ marginTop: 16 }}>{status}</div>}
    </div>
  );
}
