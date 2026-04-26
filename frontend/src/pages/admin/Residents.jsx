import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { getItem, setItem, KEYS } from '../../utils/storage';

export default function AdminResidents() {
  const [users, setUsers] = useState(getItem(KEYS.USERS).filter(u => u.role === 'Resident'));

  const del = (id) => {
    const all = getItem(KEYS.USERS).filter(u => u.id !== id);
    setItem(KEYS.USERS, all);
    setUsers(all.filter(u => u.role === 'Resident'));
  };

  return (
    <Layout>
      <div className="page-header"><h1>RESIDENTS</h1><p>All registered residents</p></div>
      <div className="glass-card">
        <h5>Resident List</h5>
        <table className="table dark-table">
          <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Unit</th><th>Type</th><th>Rent</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.firstName} {u.lastName}</td>
                <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{u.email}</td>
                <td>{u.unit || '—'}</td>
                <td>{u.aptType || '—'}</td>
                <td>{u.rent ? `₹${u.rent.toLocaleString()}` : '—'}</td>
                <td><button className="btn-danger-custom" onClick={() => del(u.id)}>Remove</button></td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={7} className="text-center" style={{ color: 'var(--text-muted)' }}>No residents</td></tr>}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
