import React from 'react';
import Layout from '../../components/Layout';

const billingItems = [
  { label: 'Service Charges', calc: 'Shared equally', amount: 2500 },
  { label: 'Repair Fund', calc: '0.75%', amount: 600 },
  { label: 'Sinking Fund', calc: '0.25%', amount: 300 },
  { label: 'Electricity', calc: 'Pro-rata', amount: 750 },
  { label: 'Water', calc: 'Fixed', amount: 400 },
  { label: 'Non-Occupancy', calc: '10%', amount: 250 },
  { label: 'Parking', calc: 'Fixed', amount: 500 },
  { label: 'Late Interest', calc: '21%', amount: 150 },
];

const metrics = [
  { label: 'Total Billed', value: '₹12,45,000' },
  { label: 'Collected', value: '₹10,12,000' },
  { label: 'Outstanding', value: '₹2,33,000' },
  { label: 'Defaulters', value: '14 Units' },
  { label: 'Sinking Fund', value: '₹45,50,000' },
  { label: 'Vendor Pending', value: '₹1,20,000' },
];

export default function AdminBilling() {
  const subtotal = billingItems.reduce((s, i) => s + i.amount, 0);

  return (
    <Layout>
      <div className="page-header">
        <h1>MAINTENANCE BILLING</h1>
        <p>Resident maintenance bill breakdown and apartment financial metrics</p>
      </div>

      <div className="row g-3">
        <div className="col-md-7">
          <div className="glass-card">
            <h5>Resident Maintenance Bill</h5>
            <table className="table dark-table mb-0">
              <thead>
                <tr><th>Particulars</th><th>Calculation</th><th className="text-end">Amount (₹)</th></tr>
              </thead>
              <tbody>
                {billingItems.map((item, i) => (
                  <tr key={i} className="billing-row">
                    <td>{item.label}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{item.calc}</td>
                    <td className="text-end">{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="billing-subtotal">
                  <td colSpan={2}><strong>Sub Total</strong></td>
                  <td className="text-end"><strong>{subtotal.toLocaleString()}</strong></td>
                </tr>
                <tr className="billing-row">
                  <td>GST (18%)</td>
                  <td></td>
                  <td className="text-end">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-5">
          <div className="glass-card">
            <h5>Apartment Metrics</h5>
            <table className="table dark-table mb-0">
              <thead><tr><th>Metric</th><th className="text-end">Value</th></tr></thead>
              <tbody>
                {metrics.map((m, i) => (
                  <tr key={i} className="billing-row">
                    <td>{m.label}</td>
                    <td className="text-end" style={{ color: 'white', fontWeight: 600 }}>{m.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
