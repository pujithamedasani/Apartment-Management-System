import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { seedData } from './utils/storage';

import Login from './pages/Login';
import Signup from './pages/Signup';

// Admin
import AdminDashboard from './pages/admin/Dashboard';
import AdminApartments from './pages/admin/Apartments';
import AdminBilling from './pages/admin/Billing';
import AdminPayments from './pages/admin/Payments';
import AdminComplaints from './pages/admin/Complaints';
import AdminResidents from './pages/admin/Residents';
import AdminProfile from './pages/admin/Profile';
import AdminHelp from './pages/admin/Help';

// Resident
import ResidentDashboard from './pages/resident/Dashboard';
import ResidentProperty from './pages/resident/Property';
import ResidentMaintenance from './pages/resident/Maintenance';
import ResidentPayments from './pages/resident/Payments';
import ResidentProfile from './pages/resident/Profile';
import ResidentHelp from './pages/resident/Help';

// Staff
import StaffDashboard from './pages/staff/Dashboard';
import StaffComplaints from './pages/staff/Complaints';
import StaffMaintenance from './pages/staff/Maintenance';
import StaffProfile from './pages/staff/Profile';
import StaffHelp from './pages/staff/Help';

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'Admin') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'Resident') return <Navigate to="/resident/dashboard" replace />;
  return <Navigate to="/staff/dashboard" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/apartments" element={<ProtectedRoute role="Admin"><AdminApartments /></ProtectedRoute>} />
      <Route path="/admin/billing" element={<ProtectedRoute role="Admin"><AdminBilling /></ProtectedRoute>} />
      <Route path="/admin/payments" element={<ProtectedRoute role="Admin"><AdminPayments /></ProtectedRoute>} />
      <Route path="/admin/complaints" element={<ProtectedRoute role="Admin"><AdminComplaints /></ProtectedRoute>} />
      <Route path="/admin/residents" element={<ProtectedRoute role="Admin"><AdminResidents /></ProtectedRoute>} />
      <Route path="/admin/profile" element={<ProtectedRoute role="Admin"><AdminProfile /></ProtectedRoute>} />
      <Route path="/admin/help" element={<ProtectedRoute role="Admin"><AdminHelp /></ProtectedRoute>} />

      {/* Resident */}
      <Route path="/resident/dashboard" element={<ProtectedRoute role="Resident"><ResidentDashboard /></ProtectedRoute>} />
      <Route path="/resident/property" element={<ProtectedRoute role="Resident"><ResidentProperty /></ProtectedRoute>} />
      <Route path="/resident/maintenance" element={<ProtectedRoute role="Resident"><ResidentMaintenance /></ProtectedRoute>} />
      <Route path="/resident/payments" element={<ProtectedRoute role="Resident"><ResidentPayments /></ProtectedRoute>} />
      <Route path="/resident/profile" element={<ProtectedRoute role="Resident"><ResidentProfile /></ProtectedRoute>} />
      <Route path="/resident/help" element={<ProtectedRoute role="Resident"><ResidentHelp /></ProtectedRoute>} />

      {/* Staff */}
      <Route path="/staff/dashboard" element={<ProtectedRoute role="Staff"><StaffDashboard /></ProtectedRoute>} />
      <Route path="/staff/complaints" element={<ProtectedRoute role="Staff"><StaffComplaints /></ProtectedRoute>} />
      <Route path="/staff/maintenance" element={<ProtectedRoute role="Staff"><StaffMaintenance /></ProtectedRoute>} />
      <Route path="/staff/profile" element={<ProtectedRoute role="Staff"><StaffProfile /></ProtectedRoute>} />
      <Route path="/staff/help" element={<ProtectedRoute role="Staff"><StaffHelp /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  useEffect(() => { seedData(); }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
