import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { getItem, setItem, KEYS, validatePassword } from '../../utils/storage';

export default function ResidentProfile() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [form, setForm] = useState({
    firstName: user.firstName, lastName: user.lastName,
    email: user.email, contact: user.contact || ''
  });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [saved, setSaved] = useState(false);
  const [pwMsg, setPwMsg] = useState('');

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

  const tabs = [
    { id: 'details', label: 'Your Details' },
    { id: 'password', label: 'Change Password' },
    { id: 'property', label: 'Property' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'payments', label: 'Payments' },
  ];

  const complaints = getItem(KEYS.COMPLAINTS).filter(c => c.userId === user.id);
  const payments = getItem(KEYS.PAYMENTS).filter(p => p.userId === user.id);

  return (
    <Layout>
      <div className="page-header"><h1>PROFILE</h1><p>Manage your personal information</p></div>

      <ul className="nav custom-tabs mb-4">
        {tabs.map(t => (
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
              <div className="mt-4">
                <h5 style={{ fontSize: '1rem' }}>Your Identification</h5>
                <div style={{ background: 'rgba(45,27,105,0.3)', borderRadius: 10, padding: '1rem', marginTop: '0.75rem' }}>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.88rem' }}><i className="bi bi-building me-2" style={{ color: 'var(--accent)' }}></i>Unit: {user.unit || 'Not assigned'}</p>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.88rem' }}><i className="bi bi-house me-2" style={{ color: 'var(--accent)' }}></i>{user.aptType || '—'}</p>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.88rem' }}><i className="bi bi-arrows-angle-expand me-2" style={{ color: 'var(--accent)' }}></i>Area: {user.area || '—'}</p>
                </div>
              </div>
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

          {activeTab === 'property' && (
            <div className="glass-card">
              <h5>Property Details</h5>
              <div className="unit-highlight">
                <h5>{user.unit || 'No unit assigned'}</h5>
                <p style={{ color: 'var(--text-muted)' }}>{user.aptType}</p>
                <p style={{ color: 'var(--text-muted)' }}>Area: {user.area}</p>
                {user.rent && <p className="price mt-2">₹{user.rent.toLocaleString()} / month</p>}
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="glass-card">
              <h5>Maintenance History</h5>
              <table className="table dark-table mb-0">
                <thead><tr><th>#</th><th>Complaint</th><th>Status</th></tr></thead>
                <tbody>
                  {complaints.map((c, i) => (
                    <tr key={c.id}><td>{i+1}</td><td style={{ fontSize: '0.83rem' }}>{c.complaint}</td>
                      <td><span className={c.status === 'Done' ? 'badge-done' : 'badge-pending'}>{c.status}</span></td>
                    </tr>
                  ))}
                  {complaints.length === 0 && <tr><td colSpan={3} className="text-center" style={{ color: 'var(--text-muted)' }}>No complaints</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="glass-card">
              <h5>Payment History</h5>
              <table className="table dark-table mb-0">
                <thead><tr><th>Category</th><th>Amount</th><th>Date</th></tr></thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.id}><td>{p.category}</td><td style={{ color: '#4ade80' }}>₹{Number(p.amount).toLocaleString()}</td><td style={{ fontSize: '0.82rem' }}>{p.date}</td></tr>
                  ))}
                  {payments.length === 0 && <tr><td colSpan={3} className="text-center" style={{ color: 'var(--text-muted)' }}>No payments</td></tr>}
                </tbody>
              </table>
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
            <p className="text-center" style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Unit {user.unit}</p>
            <p className="text-center" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{user.aptType}</p>
            {user.rent && <p className="price text-center mt-2">₹{user.rent.toLocaleString()} / month</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
}
