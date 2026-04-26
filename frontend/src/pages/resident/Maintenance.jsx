import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { getItem, setItem, KEYS } from '../../utils/storage';

export default function ResidentMaintenance() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState(getItem(KEYS.COMPLAINTS).filter(c => c.userId === user.id));
  const [text, setText] = useState('');

  const allComplaints = () => getItem(KEYS.COMPLAINTS);

  const submit = () => {
    if (!text.trim()) return;
    const all = allComplaints();
    const newC = { id: Date.now(), userId: user.id, complaint: text, status: 'Pending', type: 'General', days: 0, bill: 0, hasBill: false };
    const updated = [...all, newC];
    setItem(KEYS.COMPLAINTS, updated);
    setComplaints(updated.filter(c => c.userId === user.id));
    setText('');
  };

  const pending = complaints.filter(c => c.status === 'Pending').length;
  const done = complaints.filter(c => c.status === 'Done').length;
  const billPending = complaints.reduce((s, c) => s + (c.bill || 0), 0);

  return (
    <Layout>
      <div className="page-header"><h1>MAINTENANCE</h1><p>Submit and track your maintenance requests</p></div>

      <div className="row g-3 mb-4">
        <div className="col-md-3"><div className="stat-card stat-blue"><h2>{complaints.length}</h2><p>Total Complaints</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-red"><h2>{pending}</h2><p>Pending</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-green"><h2>{done}</h2><p>Completed</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-orange"><h2>₹{billPending.toLocaleString()}</h2><p>Payments Pending</p></div></div>
      </div>

      <div className="glass-card mb-4">
        <h5>Complaint Details</h5>
        <table className="table dark-table mb-3">
          <thead><tr><th>Sno</th><th>Type</th><th>Complaint</th><th>Status</th><th>Days</th><th>Bill</th><th>Action</th></tr></thead>
          <tbody>
            {complaints.map((c, i) => (
              <tr key={c.id}>
                <td>{i + 1}</td>
                <td style={{ fontSize: '0.82rem' }}>{c.type}</td>
                <td style={{ fontSize: '0.82rem', maxWidth: 280 }}>{c.complaint}</td>
                <td><span className={c.status === 'Done' ? 'badge-done' : c.status === 'Pending' ? 'badge-pending' : 'badge-wip'}>{c.status}</span></td>
                <td>{c.days || '—'}</td>
                <td>{c.bill ? `₹${c.bill}` : 'No'}</td>
                <td>
                  {c.status === 'Pending' && (
                    <button className="btn-danger-custom" onClick={() => {
                      const all = allComplaints().filter(x => x.id !== c.id);
                      setItem(KEYS.COMPLAINTS, all);
                      setComplaints(all.filter(x => x.userId === user.id));
                    }}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
            {complaints.length === 0 && <tr><td colSpan={7} className="text-center" style={{ color: 'var(--text-muted)' }}>No complaints yet</td></tr>}
          </tbody>
        </table>

        <div className="dark-form">
          <label>Enter complaint</label>
          <textarea className="form-control mb-3" rows={3} placeholder="Describe your issue..." value={text} onChange={e => setText(e.target.value)} />
          <div className="d-flex gap-2">
            <button className="btn-primary-custom" onClick={submit}>Submit</button>
            <button className="btn-danger-custom" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }} onClick={() => setText('')}>Cancel</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
