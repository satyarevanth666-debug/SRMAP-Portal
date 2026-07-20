import React, { useState } from 'react';
import api from '../services/api';

export default function ExaminationDegreePhotoUpload(){
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    if (!file) { setStatus('Please choose a photo file.'); return; }
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    setStatus(null);
    try {
      await api.post('/exam/degree-photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setStatus('Degree photo uploaded successfully');
      setFile(null);
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Degree Photo Upload</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 16, maxWidth: 500 }}>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0] || null)} />
        <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 8, border: 'none', background: '#2774e0', color: '#fff' }}>{loading ? 'Uploading...' : 'Upload Photo'}</button>
      </form>
      {status && <div style={{ marginTop: 16 }}>{status}</div>}
    </div>
  );
}
