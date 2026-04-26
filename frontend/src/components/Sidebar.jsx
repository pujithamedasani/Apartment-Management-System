import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navConfig = {
  Admin: [
    { to: '/admin/dashboard', icon: 'bi-grid-fill', label: 'Dashboard' },
    { to: '/admin/apartments', icon: 'bi-buildings-fill', label: 'Apartments' },
    { to: '/admin/billing', icon: 'bi-receipt', label: 'Maintenance Billing' },
    { to: '/admin/payments', icon: 'bi-credit-card-fill', label: 'Payments' },
    { to: '/admin/complaints', icon: 'bi-chat-square-text-fill', label: 'Complaints' },
    { to: '/admin/residents', icon: 'bi-people-fill', label: 'Residents' },
    { to: '/admin/profile', icon: 'bi-person-circle', label: 'Profile' },
    { to: '/admin/help', icon: 'bi-question-circle-fill', label: 'Help' },
  ],
  Resident: [
    { to: '/resident/dashboard', icon: 'bi-grid-fill', label: 'Dashboard' },
    { to: '/resident/property', icon: 'bi-house-fill', label: 'Property' },
    { to: '/resident/maintenance', icon: 'bi-tools', label: 'Maintenance' },
    { to: '/resident/payments', icon: 'bi-credit-card-fill', label: 'Payments' },
    { to: '/resident/profile', icon: 'bi-person-circle', label: 'Profile' },
    { to: '/resident/help', icon: 'bi-question-circle-fill', label: 'Help' },
  ],
  Staff: [
    { to: '/staff/dashboard', icon: 'bi-grid-fill', label: 'Dashboard' },
    { to: '/staff/complaints', icon: 'bi-chat-square-text-fill', label: 'Complaints' },
    { to: '/staff/maintenance', icon: 'bi-tools', label: 'Maintenance' },
    { to: '/staff/profile', icon: 'bi-person-circle', label: 'Profile' },
    { to: '/staff/help', icon: 'bi-question-circle-fill', label: 'Help' },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = navConfig[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
  <div className="sidebar-brand">
    <div className="brand-top">
      <img src="/logo.png" alt="logo" className="sidebar-logo" />
      <h6>
        SKY-PARK<br />Apartments
      </h6>
    </div>
    <small className="d-block mt-1" style={{ color: '#c084fc' }}>
      {user?.role}
    </small>
  </div>
      <nav>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <i className={`bi ${link.icon}`}></i>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left"></i> Logout
        </button>
      </div>
    </div>
  );
}
