import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';

export default function ResidentProperty() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="page-header"><h1>MY PROPERTY</h1><p>Details about your apartment unit</p></div>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="glass-card">
            <h5>Unit Details</h5>
            <div className="unit-highlight mb-3">
              <h5>{user.unit || 'No unit assigned'}</h5>
              <p className="price">₹{user.rent ? user.rent.toLocaleString() : '—'} / month</p>
            </div>
            {[
              { label: 'Unit Number', value: user.unit || '—', icon: 'bi-building' },
              { label: 'Apartment Type', value: user.aptType || '—', icon: 'bi-house-fill' },
              { label: 'Area', value: user.area || '—', icon: 'bi-arrows-angle-expand' },
              { label: 'Monthly Rent', value: user.rent ? `₹${user.rent.toLocaleString()}` : '—', icon: 'bi-currency-rupee' },
            ].map((item, i) => (
              <div key={i} className="d-flex align-items-center gap-3 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <i className={`bi ${item.icon}`} style={{ color: 'var(--accent)', fontSize: '1.1rem', width: 24 }}></i>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.label}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="glass-card mb-3">
            <h5>Apartment Amenities</h5>
            {[
              { label: 'Swimming Pool', available: true },
              { label: 'Gymnasium', available: true },
              { label: 'Clubhouse', available: true },
              { label: 'Children\'s Park', available: true },
              { label: 'Covered Parking', available: true },
              { label: 'Power Backup', available: true },
            ].map((a, i) => (
              <div key={i} className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.88rem' }}>{a.label}</span>
                <span className={a.available ? 'badge-done' : 'badge-pending'}>{a.available ? 'Available' : 'N/A'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
