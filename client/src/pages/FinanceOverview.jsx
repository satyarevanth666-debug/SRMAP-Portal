import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function FinanceOverview(){
  const [data, setData] = useState(null);
  useEffect(()=>{
    api.get('/finance/overview').then(r=>setData(r.data)).catch(()=>{});
  },[]);
  if(!data) return <div>Loading...</div>;
  return (
    <div>
      <h2>Finance Overview</h2>
      <div>Total Fees: {data.totalFees}</div>
      <div>Total Paid: {data.totalPaid}</div>
      <div>Outstanding: {data.outstanding}</div>
    </div>
  );
}
