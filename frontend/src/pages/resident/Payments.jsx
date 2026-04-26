import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { getItem, KEYS } from '../../utils/storage';

const investments = [
  { name: 'New Green Apartments', value: '₹65 Cr+' },
  { name: 'Higher Township', value: '₹80 Cr+' },
  { name: 'Land (60 Acres)', value: '₹120 Cr' },
  { name: 'Maintenance', value: '₹12,90,000' },
  { name: 'Dolphine Maintenance', value: '₹10 Cr' },
];

export default function ResidentPayments() {
  const { user } = useAuth();
  const payments = getItem(KEYS.PAYMENTS).filter(p => p.userId === user.id);

  return (
    <Layout>
      <div className="page-header"><h1>PAYMENTS</h1><p>Your payment history and overview</p></div>
      <div className="row g-3">
        <div className="col-md-8">
          <div className="glass-card">
            <h5>Payments Overview</h5>
            <table className="table dark-table mb-0">
              <thead><tr><th>Category</th><th>Amount</th><th>Reason</th><th>Date</th></tr></thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id}>
                    <td>{p.category}</td>
                    <td style={{ color: '#4ade80', fontWeight: 600 }}>₹{Number(p.amount).toLocaleString()}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{p.reason}</td>
                    <td style={{ fontSize: '0.82rem' }}>{p.date}</td>
                  </tr>
                ))}
                {payments.length === 0 && <tr><td colSpan={4} className="text-center" style={{ color: 'var(--text-muted)' }}>No payments found</td></tr>}
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
          <div className="glass-card mt-3">
            <h5>Summary</h5>
            <div className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Paid</span>
              <span style={{ fontWeight: 700, color: '#4ade80' }}>₹{payments.reduce((s, p) => s + p.amount, 0).toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between py-2">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Transactions</span>
              <span style={{ fontWeight: 600 }}>{payments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
