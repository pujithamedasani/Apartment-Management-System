import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { getItem, setItem, KEYS } from '../../utils/storage';

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState(getItem(KEYS.COMPLAINTS));
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const updateStatus = (id, status) => {
    const updated = complaints.map(c => c.id === id ? { ...c, status } : c);
    setItem(KEYS.COMPLAINTS, updated); setComplaints(updated);
  };

  const updateBill = (id, bill) => {
    const updated = complaints.map(c => c.id === id ? { ...c, bill: Number(bill) } : c);
    setItem(KEYS.COMPLAINTS, updated); setComplaints(updated);
  };

  const del = (id) => {
    const updated = complaints.filter(c => c.id !== id);
    setItem(KEYS.COMPLAINTS, updated); setComplaints(updated);
  };

  const pending = complaints.filter(c => c.status === 'Pending').length;
  const done = complaints.filter(c => c.status === 'Done').length;

  return (
    <Layout>
      <div className="page-header"><h1>COMPLAINTS</h1><p>Manage all resident complaints</p></div>

      <div className="row g-3 mb-4">
        <div className="col-md-3"><div className="stat-card stat-blue"><h2>{complaints.length}</h2><p>Total Complaints</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-red"><h2>{pending}</h2><p>Pending</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-green"><h2>{done}</h2><p>Completed</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-orange"><h2>₹{complaints.reduce((s, c) => s + (c.bill || 0), 0).toLocaleString()}</h2><p>Payments Pending</p></div></div>
      </div>

      <div className="glass-card">
        <h5>Complaint Details</h5>
        <table className="table dark-table">
          <thead>
            <tr><th>#</th><th>Type</th><th>Complaint</th><th>Status</th><th>Days</th><th>Bill (₹)</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td style={{ fontSize: '0.82rem' }}>{c.type || '—'}</td>
                <td style={{ maxWidth: 250, fontSize: '0.82rem' }}>{c.complaint}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    style={{ background: '#1a1040', border: '1px solid var(--border)', color: 'white', fontSize: '0.8rem', width: 'auto' }}
                    value={c.status}
                    onChange={e => updateStatus(c.id, e.target.value)}
                  >
                    <option>Pending</option><option>In Progress</option><option>Done</option>
                  </select>
                </td>
                <td>{c.days || '—'}</td>
                <td>
                  {editId === c.id ? (
                    <div className="d-flex gap-1">
                      <input type="number" className="form-control form-control-sm" style={{ background: '#1a1040', border: '1px solid var(--border)', color: 'white', width: 80 }} defaultValue={c.bill} id={`bill-${c.id}`} />
                      <button className="btn-success-custom" onClick={() => { updateBill(c.id, document.getElementById(`bill-${c.id}`).value); setEditId(null); }}>✓</button>
                    </div>
                  ) : (
                    <span onClick={() => setEditId(c.id)} style={{ cursor: 'pointer' }}>{c.bill ? `₹${c.bill.toLocaleString()}` : <span style={{ color: 'var(--text-muted)' }}>Set</span>}</span>
                  )}
                </td>
                <td><button className="btn-danger-custom" onClick={() => del(c.id)}>Delete</button></td>
              </tr>
            ))}
            {complaints.length === 0 && <tr><td colSpan={7} className="text-center" style={{ color: 'var(--text-muted)' }}>No complaints</td></tr>}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
