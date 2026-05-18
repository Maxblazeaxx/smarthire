import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Upload,
  BarChart3,
  LogOut,
  Zap,
  Users,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/upload', label: 'Upload Resumes', icon: Upload },
  { to: '/results', label: 'Results', icon: BarChart3 },
];

/**
 * Sidebar navigation component.
 * Fixed left panel with nav links, logo, and user info.
 */
export default function Sidebar({ open, darkMode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!open) return null;

  return (
    <aside
      className="fixed top-0 left-0 h-full z-40 flex flex-col"
      style={{
        width: '260px',
        background: darkMode
          ? 'linear-gradient(180deg, #1a1831 0%, #0f0e1a 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #f8f7ff 100%)',
        borderRight: darkMode
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(99,102,241,0.15)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b"
        style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(99,102,241,0.15)' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
          <Zap size={18} className="text-white" />
        </div>
        <div>
          <h1 className={`font-bold text-base leading-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            SmartHire
          </h1>
          <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Resume Filter
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-widest px-4 mb-3 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
          Menu
        </p>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''} ${darkMode ? '' : '!text-slate-600 hover:!text-primary-600'}`
            }
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile + Logout */}
      <div className="p-4 border-t"
        style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(99,102,241,0.15)' }}>
        {user && (
          <div className="flex items-center gap-3 mb-3 px-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {user.name}
              </p>
              <p className={`text-xs truncate ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {user.role}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`sidebar-link w-full ${darkMode ? '' : '!text-slate-600 hover:!text-rose-500'}`}
        >
          <LogOut size={16} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
