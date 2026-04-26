import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validatePassword } from '../utils/storage';

export default function Signup() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'Resident' });
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { firstName, lastName, email, password, role } = form;
    if (!firstName || !lastName || !email || !password) { setError('Fill all required fields'); return; }
    const pwErr = validatePassword(password);
    if (pwErr) { setError(pwErr); return; }
    setLoading(true);
    const result = await signup(form);
    setLoading(false);
    if (!result.success) { setError(result.message || 'Signup failed'); return; }
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-image-panel">
        <div className="overlay-text">
          <h1>SKY-PARK<br />Apartments</h1>
          <p>Premium Living Experience</p>
        </div>
      </div>
      <div className="auth-form-panel">
        <h2>Create an account</h2>
        <p className="sub">Already have an account? <Link to="/login">Login</Link></p>
        {error && <div className="alert alert-danger py-2 mb-3" style={{ fontSize: '0.85rem', borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col"><input className="form-control" placeholder="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} /></div>
            <div className="col"><input className="form-control" placeholder="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} /></div>
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPass ? 'text' : 'password'}
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9e8fc4', cursor: 'pointer' }}>
              <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>
          <div className="mb-3" style={{ background: 'rgba(192,132,252,0.07)', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.75rem', color: '#9e8fc4' }}>
            Password: 6–8 letters + 1 special char + 1–5 numbers, min 8 chars total
          </div>
          <div className="mb-4">
            <select className="form-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="Resident">Resident</option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
