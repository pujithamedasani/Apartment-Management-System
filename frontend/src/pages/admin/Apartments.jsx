import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { getItem, setItem, KEYS } from '../../utils/storage';

const emptyForm = { name: '', blocks: '', clubs: '', gym: false, pool: false, park: false, underConstruction: false };

export default function AdminApartments() {
  const [apts, setApts] = useState(getItem(KEYS.APARTMENTS));
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const save = () => {
    let updated;
    if (editId) {
      updated = apts.map(a => a.id === editId ? { ...a, ...form } : a);
    } else {
      updated = [...apts, { id: Date.now(), ...form, color: 'stat-blue' }];
    }
    setItem(KEYS.APARTMENTS, updated);
    setApts(updated);
    setForm(emptyForm); setEditId(null); setShowForm(false);
  };

  const del = (id) => {
    const updated = apts.filter(a => a.id !== id);
    setItem(KEYS.APARTMENTS, updated);
    setApts(updated);
  };

  const edit = (a) => {
    setForm({ name: a.name, blocks: a.blocks, clubs: a.clubs, gym: a.gym || false, pool: a.pool || false, park: a.park || false, underConstruction: a.underConstruction });
    setEditId(a.id); setShowForm(true);
  };

  const colors = ['stat-red', 'stat-green', 'stat-orange', 'stat-blue', 'stat-purple'];

  return (
    <Layout>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>APARTMENTS</h1>
          <p>Manage all apartment complexes</p>
        </div>
        <button className="btn-primary-custom" onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); }}>
          <i className="bi bi-plus-lg me-1"></i> Add Apartment
        </button>
      </div>

      <div className="glass-card mb-4">
        <h5>Current & Upcoming</h5>
        <div className="row">
          <div className="col-md-6">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Current Apartments</p>
            {apts.filter(a => !a.underConstruction).map((a, i) => (
              <p key={a.id} style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}>{i + 1}. {a.name}</p>
            ))}
          </div>
          <div className="col-md-6">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Planning to Buy</p>
            <p style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}>1. New Green Apartments</p>
            <p style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}>2. Higher Township</p>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {apts.map((a, i) => (
          <div className="col-md-4" key={a.id}>
            <div className="apt-card" style={{ borderTop: `3px solid`, borderColor: i === 0 ? '#ef4444' : i === 1 ? '#22c55e' : '#f59e0b' }}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6>{a.name}</h6>
                <div className="d-flex gap-1">
                  <button className="btn-edit-custom" onClick={() => edit(a)}>Edit</button>
                  <button className="btn-danger-custom" onClick={() => del(a.id)}>Del</button>
                </div>
              </div>
              <div className="meta"><i className="bi bi-building"></i> Blocks: {a.blocks}</div>
              <div className="meta"><i className="bi bi-people"></i> Clubs: {a.clubs}</div>
              <div className="meta"><i className="bi bi-activity"></i> Gym: {a.gym ? 'Yes' : 'No'}</div>
              <div className="meta"><i className="bi bi-water"></i> Pool: {a.pool ? 'Yes' : 'No'}</div>
              <div className="meta"><i className="bi bi-tree"></i> Park: {a.park ? 'Yes' : 'No'}</div>
              <div className="meta">
                <i className="bi bi-cone-striped"></i> Under Construction:
                <span className={a.underConstruction ? 'badge-pending ms-1' : 'badge-done ms-1'}>
                  {a.underConstruction ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-dark">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editId ? 'Edit' : 'Add'} Apartment</h5>
                <button className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <div className="modal-body dark-form">
                <div className="mb-3"><label>Apartment Name</label><input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="row g-2 mb-3">
                  <div className="col"><label>Blocks</label><input type="number" className="form-control" value={form.blocks} onChange={e => setForm({ ...form, blocks: e.target.value })} /></div>
                  <div className="col"><label>Clubs</label><input type="number" className="form-control" value={form.clubs} onChange={e => setForm({ ...form, clubs: e.target.value })} /></div>
                </div>
                {['gym', 'pool', 'park', 'underConstruction'].map(key => (
                  <div className="form-check mb-2" key={key}>
                    <input className="form-check-input" type="checkbox" checked={form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })} id={key} />
                    <label className="form-check-label" htmlFor={key} style={{ color: 'var(--text-light)' }}>
                      {key === 'underConstruction' ? 'Under Construction' : key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn-primary-custom" onClick={save}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
