import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

/**
 * AppLayout — the outer shell for authenticated pages.
 * Contains sidebar + top navbar + main content area.
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}
      style={{ background: darkMode ? '#0f0e1a' : '#f1f5fb' }}>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} darkMode={darkMode} />

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '260px' : '0' }}
      >
        <Navbar
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet context={{ darkMode }} />
        </main>
      </div>
    </div>
  );
}
