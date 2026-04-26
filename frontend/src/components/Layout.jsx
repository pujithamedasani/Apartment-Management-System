import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <div className="wavy-bg"></div>
      <Sidebar />
      <div className="main-content content-z">
        {children}
      </div>
    </div>
  );
}
