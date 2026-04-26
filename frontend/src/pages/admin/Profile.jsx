import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { getItem, setItem, KEYS } from '../../utils/storage';

export default function AdminProfile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email, contact: user.contact || '' });
  const [saved, setSaved] = useState(false);

  const save = () => {
    const users = getItem(KEYS.USERS);
    const updated = users.map(u => u.id === user.id ? { ...u, ...form } : u);
    setItem(KEYS.USERS, updated);
    login({ ...user, ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout>
      <div className="page-header"><h1>PROFILE</h1><p>Manage your account details</p></div>
      <div className="row g-3">
        <div className="col-md-8">
          <div className="glass-card dark-form">
            <h5>Your Details</h5>
            <div className="row g-3 mb-3">
              <div className="col"><label>First Name</label><input className="form-control" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} /></div>
              <div className="col"><label>Last Name</label><input className="form-control" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} /></div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col"><label>Email</label><input className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div className="col"><label>Contact Number</label><input className="form-control" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} /></div>
            </div>
            {saved && <div className="alert-dark-info p-2 mb-3">Profile saved successfully!</div>}
            <button className="btn-primary-custom" onClick={save}>Save</button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="unit-highlight">
            <div className="text-center mb-3">
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto' }}>
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
            </div>
            <h5 className="text-center">{user.firstName} {user.lastName}</h5>
            <p className="text-center" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>{user.role}</p>
            <hr style={{ borderColor: 'var(--border)' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}><i className="bi bi-envelope me-2"></i>{user.email}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
