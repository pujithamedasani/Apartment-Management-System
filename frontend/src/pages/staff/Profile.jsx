import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { getItem, setItem, KEYS, validatePassword } from '../../utils/storage';

export default function StaffProfile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email, contact: user.contact || '' });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [saved, setSaved] = useState(false);
  const [pwMsg, setPwMsg] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const save = () => {
    const users = getItem(KEYS.USERS);
    const updated = users.map(u => u.id === user.id ? { ...u, ...form } : u);
    setItem(KEYS.USERS, updated);
    login({ ...user, ...form });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const changePassword = () => {
    setPwMsg('');
    const users = getItem(KEYS.USERS);
    const current = users.find(u => u.id === user.id);
    if (current.password !== pwForm.current) { setPwMsg('Current password is incorrect'); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwMsg('New passwords do not match'); return; }
    const err = validatePassword(pwForm.newPw);
    if (err) { setPwMsg(err); return; }
    const updated = users.map(u => u.id === user.id ? { ...u, password: pwForm.newPw } : u);
    setItem(KEYS.USERS, updated);
    setPwMsg('success');
    setPwForm({ current: '', newPw: '', confirm: '' });
  };

  return (
    <Layout>
      <div className="page-header"><h1>PROFILE</h1><p>Manage your account information</p></div>

      <ul className="nav custom-tabs mb-4">
        {[{ id: 'details', label: 'Your Details' }, { id: 'password', label: 'Change Password' }].map(t => (
          <li className="nav-item" key={t.id}>
            <button className={`nav-link ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
          </li>
        ))}
      </ul>

      <div className="row g-3">
        <div className="col-md-8">
          {activeTab === 'details' && (
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
              {saved && <div className="alert-dark-info p-2 mb-3">Profile saved!</div>}
              <button className="btn-primary-custom" onClick={save}>Save</button>
            </div>
          )}
          {activeTab === 'password' && (
            <div className="glass-card dark-form">
              <h5>Change Password</h5>
              <div className="mb-3"><label>Current Password</label><input type="password" className="form-control" value={pwForm.current} onChange={e => setPwForm({ ...pwForm, current: e.target.value })} /></div>
              <div className="mb-3"><label>New Password</label><input type="password" className="form-control" value={pwForm.newPw} onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })} /></div>
              <div className="mb-3"><label>Confirm New Password</label><input type="password" className="form-control" value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} /></div>
              <div style={{ background: 'rgba(192,132,252,0.07)', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.75rem', color: '#9e8fc4', marginBottom: '1rem' }}>
                Password: 6–8 letters + 1 special char + 1–5 numbers, min 8 chars total
              </div>
              {pwMsg && pwMsg !== 'success' && <div className="alert-dark-info p-2 mb-3" style={{ color: '#f87171' }}>{pwMsg}</div>}
              {pwMsg === 'success' && <div className="alert-dark-info p-2 mb-3" style={{ color: '#4ade80' }}>Password changed successfully!</div>}
              <button className="btn-primary-custom" onClick={changePassword}>Update Password</button>
            </div>
          )}
        </div>
        <div className="col-md-4">
          <div className="unit-highlight">
            <div className="text-center mb-3">
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto' }}>
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
            </div>
            <h5 className="text-center">{user.firstName} {user.lastName}</h5>
            <p className="text-center" style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Staff Member</p>
            <p className="text-center" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{user.email}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
