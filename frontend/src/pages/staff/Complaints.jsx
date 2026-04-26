import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { getItem, setItem, KEYS } from '../../utils/storage';

export default function StaffComplaints() {
  const [complaints, setComplaints] = useState(getItem(KEYS.COMPLAINTS));

  const updateStatus = (id, status) => {
    const updated = complaints.map(c => c.id === id ? { ...c, status } : c);
    setItem(KEYS.COMPLAINTS, updated); setComplaints(updated);
  };

  return (
    <Layout>
      <div className="page-header"><h1>COMPLAINTS</h1><p>View and update complaint statuses</p></div>
      <div className="glass-card">
        <h5>All Complaints</h5>
        <table className="table dark-table">
          <thead><tr><th>#</th><th>Complaint</th><th>Type</th><th>Status</th><th>Days</th><th>Update</th></tr></thead>
          <tbody>
            {complaints.map((c, i) => (
              <tr key={c.id}>
                <td>{i+1}</td>
                <td style={{ maxWidth: 280, fontSize: '0.83rem' }}>{c.complaint}</td>
                <td style={{ fontSize: '0.82rem' }}>{c.type || '—'}</td>
                <td><span className={c.status === 'Done' ? 'badge-done' : c.status === 'Pending' ? 'badge-pending' : 'badge-wip'}>{c.status}</span></td>
                <td>{c.days || '—'}</td>
                <td>
                  <select className="form-select form-select-sm" style={{ background: '#1a1040', border: '1px solid var(--border)', color: 'white', fontSize: '0.8rem', width: 'auto' }}
                    value={c.status} onChange={e => updateStatus(c.id, e.target.value)}>
                    <option>Pending</option><option>In Progress</option><option>Done</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
