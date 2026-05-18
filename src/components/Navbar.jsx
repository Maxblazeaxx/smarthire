import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, Sun, Moon, Bell } from 'lucide-react';

/**
 * Top navigation bar.
 * Contains sidebar toggle, page title area, dark mode toggle, and notifications.
 */
export default function Navbar({ onToggleSidebar, sidebarOpen, darkMode, onToggleDarkMode }) {
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
      style={{
        background: darkMode
          ? 'rgba(15,14,26,0.85)'
          : 'rgba(241,245,251,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: darkMode
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(99,102,241,0.15)',
      }}
    >
      {/* Left: Sidebar Toggle */}
      <button
        onClick={onToggleSidebar}
        className={`p-2 rounded-lg transition-colors ${
          darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
        }`}
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Center: Brand mark when sidebar is closed */}
      {!sidebarOpen && (
        <span className="gradient-text font-bold text-lg">SmartHire</span>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          onClick={onToggleDarkMode}
          id="theme-toggle"
          className={`p-2 rounded-lg transition-all duration-200 ${
            darkMode ? 'hover:bg-white/10 text-amber-400' : 'hover:bg-slate-200 text-slate-600'
          }`}
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications (decorative) */}
        <button
          className={`relative p-2 rounded-lg transition-colors ${
            darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
          }`}
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
        </button>

        {/* User avatar */}
        {user && (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-primary-500/40"
            title={user.name}
          />
        )}
      </div>
    </header>
  );
}
