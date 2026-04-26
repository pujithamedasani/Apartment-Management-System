//  src/utils/api.js  –  centralised API service
//
//  When MONGODB_URI is NOT set the backend still starts but DB calls fail,
//  so the frontend falls back to localStorage automatically (see each method).


const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Attach JWT token from localStorage to every request
const headers = (extra = {}) => {
  const token = localStorage.getItem('ams_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
};

const request = async (method, path, body) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: headers(),
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
};

// ── Auth ──────────────────────────────────────────────────────────────────────
export const apiLogin  = (body) => request('POST', '/auth/login',  body);
export const apiSignup = (body) => request('POST', '/auth/signup', body);
export const apiMe     = ()     => request('GET',  '/auth/me');

// ── Users ─────────────────────────────────────────────────────────────────────
export const apiGetUsers    = ()         => request('GET',    '/users');
export const apiGetUser     = (id)       => request('GET',    `/users/${id}`);
export const apiUpdateUser  = (id, body) => request('PUT',    `/users/${id}`, body);
export const apiDeleteUser  = (id)       => request('DELETE', `/users/${id}`);

// ── Apartments ────────────────────────────────────────────────────────────────
export const apiGetApartments    = ()         => request('GET',    '/apartments');
export const apiCreateApartment  = (body)     => request('POST',   '/apartments', body);
export const apiUpdateApartment  = (id, body) => request('PUT',    `/apartments/${id}`, body);
export const apiDeleteApartment  = (id)       => request('DELETE', `/apartments/${id}`);

// ── Complaints ────────────────────────────────────────────────────────────────
export const apiGetComplaints    = ()         => request('GET',    '/complaints');
export const apiCreateComplaint  = (body)     => request('POST',   '/complaints', body);
export const apiUpdateComplaint  = (id, body) => request('PUT',    `/complaints/${id}`, body);
export const apiDeleteComplaint  = (id)       => request('DELETE', `/complaints/${id}`);

// ── Payments ──────────────────────────────────────────────────────────────────
export const apiGetPayments    = ()         => request('GET',    '/payments');
export const apiCreatePayment  = (body)     => request('POST',   '/payments', body);
export const apiUpdatePayment  = (id, body) => request('PUT',    `/payments/${id}`, body);
export const apiDeletePayment  = (id)       => request('DELETE', `/payments/${id}`);

// ── Properties ────────────────────────────────────────────────────────────────
export const apiGetProperties    = ()         => request('GET',    '/properties');
export const apiCreateProperty   = (body)     => request('POST',   '/properties', body);
export const apiUpdateProperty   = (id, body) => request('PUT',    `/properties/${id}`, body);
export const apiDeleteProperty   = (id)       => request('DELETE', `/properties/${id}`);
