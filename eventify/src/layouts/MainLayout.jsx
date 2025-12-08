import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/ui/NavBar';
import './MainLayout.css';

export function MainLayout() {
  return (
    <div className="main-layout">
      <NavBar />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
