import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { getItem, setItem, KEYS } from '../../utils/storage';

export default function StaffMaintenance() {
  const [complaints, setComplaints] = useState(getItem(KEYS.COMPLAINTS));
  const [typeFilter, setTypeFilter] = useState('All');

  const updateType = (id, type) => {
    const updated = complaints.map(c => c.id === id ? { ...c, type } : c);
    setItem(KEYS.COMPLAINTS, updated);
    setComplaints(updated);
  };

  const updateDays = (id, days) => {
    const updated = complaints.map(c => c.id === id ? { ...c, days: Number(days) } : c);
    setItem(KEYS.COMPLAINTS, updated);
    setComplaints(updated);
  };

  const maintenanceTypes = ['General', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'Other'];

  const filtered = typeFilter === 'All' ? complaints : complaints.filter(c => c.type === typeFilter);

  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const done = complaints.filter(c => c.status === 'Done').length;

  return (
    <Layout>
      <div className="page-header">
        <h1>MAINTENANCE</h1>
        <p>Assign types and track time for all maintenance tasks</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3"><div className="stat-card stat-blue"><h2>{complaints.length}</h2><p>Total Tasks</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-red"><h2>{pending}</h2><p>Pending</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-orange"><h2>{inProgress}</h2><p>In Progress</p></div></div>
        <div className="col-md-3"><div className="stat-card stat-green"><h2>{done}</h2><p>Completed</p></div></div>
      </div>

      <div className="glass-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Maintenance Tasks</h5>
          <select
            className="form-select form-select-sm"
            style={{ background: '#1a1040', border: '1px solid var(--border)', color: 'white', fontSize: '0.85rem', width: 'auto' }}
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            {maintenanceTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <table className="table dark-table">
          <thead>
            <tr><th>#</th><th>Complaint</th><th>Type</th><th>Status</th><th>Days Taken</th></tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id}>
                <td>{i + 1}</td>
                <td style={{ maxWidth: 280, fontSize: '0.83rem' }}>{c.complaint}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    style={{ background: '#1a1040', border: '1px solid var(--border)', color: 'white', fontSize: '0.8rem', width: 'auto' }}
                    value={c.type || 'General'}
                    onChange={e => updateType(c.id, e.target.value)}
                  >
                    {maintenanceTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </td>
                <td>
                  <span className={c.status === 'Done' ? 'badge-done' : c.status === 'Pending' ? 'badge-pending' : 'badge-wip'}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    style={{ background: '#1a1040', border: '1px solid var(--border)', color: 'white', width: 80 }}
                    defaultValue={c.days || 0}
                    min={0}
                    onBlur={e => updateDays(c.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center" style={{ color: 'var(--text-muted)' }}>No tasks found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
