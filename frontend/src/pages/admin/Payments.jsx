import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { getItem, setItem, KEYS } from '../../utils/storage';

const categories = ['Resident Income','Facility Booking','Move-In (MIMO)','Vendor Payment','Petty Cash','Utility Outflow','Legal/Admin','Late Fee'];
const empty = { category: 'Resident Income', amount: '', reason: '', date: new Date().toISOString().split('T')[0] };

const investments = [
  { name: 'New Green Apartments', value: '₹65 Cr+' },
  { name: 'Higher Township', value: '₹80 Cr+' },
  { name: 'Land (60 Acres)', value: '₹120 Cr' },
  { name: 'Maintenance', value: '₹12,90,000' },
  { name: 'Dolphine Maintenance', value: '₹10 Cr' },
];

export default function AdminPayments() {
  const [payments, setPayments] = useState(getItem(KEYS.PAYMENTS));
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const save = () => {
    if (!form.amount || !form.reason) return;
    let updated;
    if (editId) {
      updated = payments.map(p => p.id === editId ? { ...p, ...form, amount: Number(form.amount) } : p);
    } else {
      updated = [...payments, { id: Date.now(), ...form, amount: Number(form.amount), userId: 0 }];
    }
    setItem(KEYS.PAYMENTS, updated);
    setPayments(updated);
    setForm(empty); setEditId(null); setShowForm(false);
  };

  const del = (id) => {
    const updated = payments.filter(p => p.id !== id);
    setItem(KEYS.PAYMENTS, updated); setPayments(updated);
  };

  return (
    <Layout>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div><h1>PAYMENTS</h1><p>Overview of all financial transactions</p></div>
        <button className="btn-primary-custom" onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}>
          <i className="bi bi-plus-lg me-1"></i> Add Payment
        </button>
      </div>

      <div className="row g-3">
        <div className="col-md-8">
          <div className="glass-card">
            <h5>Payments Overview</h5>
            <table className="table dark-table mb-0">
              <thead><tr><th>Category</th><th>Amount</th><th>Reason</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id}>
                    <td>{p.category}</td>
                    <td style={{ color: '#4ade80', fontWeight: 600 }}>₹{Number(p.amount).toLocaleString()}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{p.reason}</td>
                    <td style={{ fontSize: '0.82rem' }}>{p.date}</td>
                    <td>
                      <button className="btn-edit-custom me-1" onClick={() => { setForm({ category: p.category, amount: p.amount, reason: p.reason, date: p.date }); setEditId(p.id); setShowForm(true); }}>Edit</button>
                      <button className="btn-danger-custom" onClick={() => del(p.id)}>Del</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4">
          <div className="glass-card">
            <h5>Upcoming Investments</h5>
            {investments.map((inv, i) => (
              <div key={i} className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{inv.name}</span>
                <span style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '0.85rem' }}>{inv.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-dark">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editId ? 'Edit' : 'Add'} Payment</h5>
                <button className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <div className="modal-body dark-form">
                <div className="mb-3"><label>Category</label>
                  <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="mb-3"><label>Amount (₹)</label><input type="number" className="form-control" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} /></div>
                <div className="mb-3"><label>Reason</label><input className="form-control" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} /></div>
                <div className="mb-3"><label>Date</label><input type="date" className="form-control" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
              </div>
              <div className="modal-footer">
                <button className="btn-primary-custom" onClick={save}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
