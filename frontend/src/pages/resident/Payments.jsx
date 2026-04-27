import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { getItem, KEYS } from '../../utils/storage';

export default function ResidentPayments() {
  const { user } = useAuth();
  const payments = getItem(KEYS.PAYMENTS).filter(p => p.userId === user.id);

  return (
    <Layout>
      <div className="page-header">
        <h1>PAYMENTS</h1>
        <p>Your payment history and overview</p>
      </div>

      <div className="row g-3">
        
        {/* LEFT SIDE - PAYMENTS TABLE */}
        <div className="col-md-8">
          <div className="glass-card">
            <h5>Payments Overview</h5>
            <table className="table dark-table mb-0">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Reason</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id}>
                    <td>{p.category}</td>
                    <td style={{ color: '#4ade80', fontWeight: 600 }}>
                      ₹{Number(p.amount).toLocaleString()}
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {p.reason}
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{p.date}</td>
                  </tr>
                ))}

                {payments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center" style={{ color: 'var(--text-muted)' }}>
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SIDE - SUMMARY ONLY */}
        <div className="col-md-4">
          <div className="glass-card">
            <h5>Summary</h5>

            <div
              className="d-flex justify-content-between py-2"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Total Paid
              </span>
              <span style={{ fontWeight: 700, color: '#4ade80' }}>
                ₹{payments.reduce((s, p) => s + p.amount, 0).toLocaleString()}
              </span>
            </div>

            <div className="d-flex justify-content-between py-2">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Transactions
              </span>
              <span style={{ fontWeight: 600 }}>{payments.length}</span>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
}