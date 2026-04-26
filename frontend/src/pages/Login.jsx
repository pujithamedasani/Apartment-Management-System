import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Fill all required fields'); return; }
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (!result.success) { setError(result.message || 'Invalid email or password'); return; }
    const role = result.user.role;
    if (role === 'Admin') navigate('/admin/dashboard');
    else if (role === 'Resident') navigate('/resident/dashboard');
    else navigate('/staff/dashboard');
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
        <h2>Welcome Back</h2>
        <p className="sub">Don't have an account? <Link to="/signup">Create one</Link></p>
        {error && <div className="alert alert-danger py-2 mb-3" style={{ fontSize: '0.85rem', borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#9e8fc4', fontSize: '0.85rem' }}>Email Address</label>
            <input type="email" className="form-control" placeholder="you@skypark.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ color: '#9e8fc4', fontSize: '0.85rem' }}>Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 p-3" style={{ background: 'rgba(192,132,252,0.08)', borderRadius: 10, border: '1px solid rgba(192,132,252,0.2)' }}>
          <p style={{ color: '#9e8fc4', fontSize: '0.78rem', marginBottom: '0.4rem' }}>Demo Credentials:</p>
          <p style={{ color: '#c084fc', fontSize: '0.78rem', margin: 0 }}>Admin: admin@skypark.com / Admin@123</p>
          <p style={{ color: '#c084fc', fontSize: '0.78rem', margin: 0 }}>Resident: resident1@skypark.com / Resident@1</p>
          <p style={{ color: '#c084fc', fontSize: '0.78rem', margin: 0 }}>Staff: staff@skypark.com / Staff@123</p>
        </div>
      </div>
    </div>
  );
}
