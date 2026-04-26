import React from 'react';
import Layout from '../../components/Layout';
import { getItem, KEYS } from '../../utils/storage';

export default function AdminDashboard() {
  const users = getItem(KEYS.USERS);
  const complaints = getItem(KEYS.COMPLAINTS);
  const payments = getItem(KEYS.PAYMENTS);
  const apts = getItem(KEYS.APARTMENTS);

  const residents = users.filter(u => u.role === 'Resident').length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const done = complaints.filter(c => c.status === 'Done').length;
  const totalIncome = payments.reduce((s, p) => s + p.amount, 0);

  return (
    <Layout>
      <div className="page-header">
        <h1>DASHBOARD</h1>
        <p>Welcome back, Admin. Here's an overview of SKY-PARK Apartments.</p>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: 'Total Residents', value: residents, cls: 'stat-blue', icon: 'bi-people-fill' },
          { label: 'Total Complaints', value: complaints.length, cls: 'stat-red', icon: 'bi-chat-square-text-fill' },
          { label: 'Pending', value: pending, cls: 'stat-orange', icon: 'bi-clock-fill' },
          { label: 'Completed', value: done, cls: 'stat-green', icon: 'bi-check-circle-fill' },
          { label: 'Apartments', value: apts.length, cls: 'stat-purple', icon: 'bi-buildings-fill' },
          { label: 'Total Revenue', value: `₹${(totalIncome/100000).toFixed(1)}L`, cls: 'stat-pink', icon: 'bi-currency-rupee' },
        ].map((s, i) => (
          <div className="col-md-4 col-lg-2" key={i}>
            <div className={`stat-card ${s.cls}`}>
              <i className={`bi ${s.icon}`} style={{ fontSize: '1.5rem', opacity: 0.7 }}></i>
              <h2 className="mt-1">{s.value}</h2>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-md-8">
          <div className="glass-card">
            <h5>Recent Complaints</h5>
            <table className="table dark-table mb-0">
              <thead><tr><th>#</th><th>Complaint</th><th>Status</th><th>Bill</th></tr></thead>
              <tbody>
                {complaints.slice(0, 5).map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td style={{ maxWidth: 300, fontSize: '0.83rem' }}>{c.complaint}</td>
                    <td>
                      <span className={c.status === 'Done' ? 'badge-done' : c.status === 'Pending' ? 'badge-pending' : 'badge-wip'}>
                        {c.status}
                      </span>
                    </td>
                    <td>{c.bill ? `₹${c.bill.toLocaleString()}` : '—'}</td>
                  </tr>
                ))}
                {complaints.length === 0 && <tr><td colSpan={4} className="text-center" style={{ color: '#9e8fc4' }}>No complaints</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4">
          <div className="glass-card">
            <h5>Apartment Metrics</h5>
            {[
              { label: 'Total Billed', value: '₹12,45,000' },
              { label: 'Collected', value: '₹10,12,000' },
              { label: 'Outstanding', value: '₹2,33,000' },
              { label: 'Defaulters', value: '14 Units' },
              { label: 'Sinking Fund', value: '₹45,50,000' },
              { label: 'Vendor Pending', value: '₹1,20,000' },
            ].map((m, i) => (
              <div key={i} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{m.label}</span>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
