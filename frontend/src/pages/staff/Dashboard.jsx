import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { getItem, KEYS } from '../../utils/storage';

export default function StaffDashboard() {
  const { user } = useAuth();
  const complaints = getItem(KEYS.COMPLAINTS);
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const done = complaints.filter(c => c.status === 'Done').length;

  return (
    <Layout>
      <div className="page-header"><h1>STAFF DASHBOARD</h1><p>Welcome, {user.firstName}. Manage maintenance tasks.</p></div>
      <div className="row g-3 mb-4">
        <div className="col-md-3"><div className="stat-card stat-blue"><h2>{complaints.length}</h2><p>Total Tasks</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-red"><h2>{pending}</h2><p>Pending</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-orange"><h2>{inProgress}</h2><p>In Progress</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-green"><h2>{done}</h2><p>Completed</p></div></div>
      </div>
      <div className="glass-card">
        <h5>Recent Tasks</h5>
        <table className="table dark-table mb-0">
          <thead><tr><th>#</th><th>Complaint</th><th>Type</th><th>Status</th></tr></thead>
          <tbody>
            {complaints.slice(0, 5).map((c, i) => (
              <tr key={c.id}>
                <td>{i+1}</td>
                <td style={{ maxWidth: 300, fontSize: '0.83rem' }}>{c.complaint}</td>
                <td style={{ fontSize: '0.82rem' }}>{c.type || '—'}</td>
                <td><span className={c.status === 'Done' ? 'badge-done' : c.status === 'Pending' ? 'badge-pending' : 'badge-wip'}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
