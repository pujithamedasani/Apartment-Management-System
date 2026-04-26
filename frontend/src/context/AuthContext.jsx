import React, { createContext, useContext, useState } from 'react';
import { apiLogin, apiSignup } from '../utils/api.js';
import { getItem, setItem, KEYS } from '../utils/storage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('ams_current_user');
    return u ? JSON.parse(u) : null;
  });

  // Tries backend first; falls back to localStorage so UI works before DB
  const login = async (email, password) => {
    try {
      const data = await apiLogin({ email, password });
      localStorage.setItem('ams_token', data.token);
      localStorage.setItem('ams_current_user', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      console.warn('[Auth] Backend unavailable – using localStorage fallback', err.message);
      const users = getItem(KEYS.USERS);
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) return { success: false, message: 'Invalid email or password' };
      localStorage.setItem('ams_current_user', JSON.stringify(found));
      setUser(found);
      return { success: true, user: found };
    }
  };

  const signup = async (formData) => {
    try {
      const data = await apiSignup(formData);
      localStorage.setItem('ams_token', data.token);
      localStorage.setItem('ams_current_user', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (err) {
      console.warn('[Auth] Backend unavailable – using localStorage fallback', err.message);
      const users = getItem(KEYS.USERS);
      if (users.find(u => u.email === formData.email)) {
        return { success: false, message: 'Email already registered' };
      }
      const newUser = { id: Date.now(), ...formData, unit: '', aptType: '' };
      setItem(KEYS.USERS, [...users, newUser]);
      localStorage.setItem('ams_current_user', JSON.stringify(newUser));
      setUser(newUser);
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem('ams_current_user');
    localStorage.removeItem('ams_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
