import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Upload, BarChart3, FileText, TrendingUp,
  ArrowRight, Users, Star, Clock
} from 'lucide-react';

/**
 * StatCard — a quick-stats overview card
 */
function StatCard({ icon: Icon, label, value, color, darkMode }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}22` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <TrendingUp size={14} className="text-emerald-400" />
      </div>
      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{value}</p>
      <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
    </div>
  );
}

/**
 * DashboardPage — overview with stats, quick actions, and how-it-works steps.
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { darkMode } = useOutletContext();

  const stats = [
    { icon: FileText, label: 'Resumes Analyzed', value: '0', color: '#6366f1' },
    { icon: Users, label: 'Candidates Ranked', value: '0', color: '#a855f7' },
    { icon: Star, label: 'Best Match Score', value: '—', color: '#f59e0b' },
    { icon: Clock, label: 'Last Analysis', value: 'Never', color: '#10b981' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Upload Resumes',
      desc: 'Upload 3–4 candidate resumes in PDF or DOCX format.',
      color: '#6366f1',
    },
    {
      num: '02',
      title: 'Enter Job Skills',
      desc: 'Type the required skills or paste a job description.',
      color: '#a855f7',
    },
    {
      num: '03',
      title: 'Analyze & Rank',
      desc: 'SmartHire scores each resume and ranks candidates.',
      color: '#10b981',
    },
    {
      num: '04',
      title: 'View Results',
      desc: 'See matched skills, missing skills, and the best candidate.',
      color: '#f59e0b',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Welcome back, {user?.name?.split(' ')[0] ?? 'Recruiter'} 👋
          </h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Ready to find your best candidate today?
          </p>
        </div>

        <button
          id="dashboard-upload-btn"
          onClick={() => navigate('/upload')}
          className="gradient-btn flex items-center gap-2 self-start sm:self-auto"
        >
          <Upload size={16} />
          Upload Resumes
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} darkMode={darkMode} />
        ))}
      </div>

      {/* How it works */}
      <div className="glass-card p-6">
        <h2 className={`text-lg font-bold mb-5 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          🚀 How SmartHire Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative p-4 rounded-xl"
              style={{ background: `${step.color}11`, border: `1px solid ${step.color}33` }}
            >
              <span
                className="text-3xl font-black opacity-20 absolute top-3 right-4"
                style={{ color: step.color }}
              >
                {step.num}
              </span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${step.color}33` }}
              >
                <span className="text-sm font-bold" style={{ color: step.color }}>{i + 1}</span>
              </div>
              <h3 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {step.title}
              </h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/upload')}
          className={`p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group ${
            darkMode ? 'glass-card hover:border-primary-500/40' : 'bg-white border border-slate-200 hover:border-primary-400'
          }`}
          id="quick-upload-btn"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3))' }}
          >
            <Upload size={18} className="text-primary-400" />
          </div>
          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Upload Resumes</h3>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Start by uploading candidate resumes
          </p>
          <ArrowRight size={14} className="text-primary-400 mt-3 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => navigate('/results')}
          className={`p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group ${
            darkMode ? 'glass-card hover:border-accent-500/40' : 'bg-white border border-slate-200 hover:border-accent-400'
          }`}
          id="quick-results-btn"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(99,102,241,0.3))' }}
          >
            <BarChart3 size={18} className="text-accent-400" />
          </div>
          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>View Results</h3>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            See the ranked candidate analysis
          </p>
          <ArrowRight size={14} className="text-accent-400 mt-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
