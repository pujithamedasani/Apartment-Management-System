import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { getItem, KEYS } from '../../utils/storage';

export default function ResidentDashboard() {
  const { user } = useAuth();
  const complaints = getItem(KEYS.COMPLAINTS).filter(c => c.userId === user.id);
  const payments = getItem(KEYS.PAYMENTS).filter(p => p.userId === user.id);
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const done = complaints.filter(c => c.status === 'Done').length;
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);

  return (
    <Layout>
      <div className="page-header">
        <h1>DASHBOARD</h1>
        <p>Welcome, {user.firstName}. Here's a summary of your apartment activity.</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3"><div className="stat-card stat-blue"><h2>{complaints.length}</h2><p>Total Complaints</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-red"><h2>{pending}</h2><p>Pending</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-green"><h2>{done}</h2><p>Completed</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-orange"><h2>₹{totalPaid.toLocaleString()}</h2><p>Total Payments</p></div></div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="glass-card">
            <h5>My Unit</h5>
            <div className="unit-highlight">
              <h5>{user.unit || 'Not Assigned'}</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{user.aptType || '—'}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Area: {user.area || '—'}</p>
              {user.rent && <p className="price">₹{user.rent.toLocaleString()} / month</p>}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="glass-card">
            <h5>Recent Complaints</h5>
            {complaints.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No complaints raised.</p>
            ) : complaints.slice(0, 3).map(c => (
              <div key={c.id} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.83rem', maxWidth: '70%' }}>{c.complaint}</span>
                <span className={c.status === 'Done' ? 'badge-done' : c.status === 'Pending' ? 'badge-pending' : 'badge-wip'}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
