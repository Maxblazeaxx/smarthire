import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Zap, LogIn, User, Lock, ArrowRight } from 'lucide-react';

/**
 * LoginPage — demo authentication with any credentials.
 * Glassmorphism card on a gradient background.
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/login', { email, password });
      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-20 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
      />
      <div
        className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full opacity-15 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
      />

      {/* Login card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 animate-bounce-in"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '2.5rem',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
          >
            <Zap size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl leading-tight">SmartHire</h1>
            <p className="text-purple-300 text-xs">AI Resume Filter</p>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-white text-2xl font-bold">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-1">
            Sign in to your recruiter dashboard
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recruiter@company.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all focus:ring-2 focus:ring-primary-500/50"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter any password"
                required
                className="w-full pl-10 pr-12 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all focus:ring-2 focus:ring-primary-500/50"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            id="login-btn"
            type="submit"
            disabled={isLoading}
            className="gradient-btn w-full flex items-center justify-center gap-2 py-3.5 mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={16} />
                Sign In to Dashboard
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-6">
          SmartHire v1.0 · Demo Application
        </p>
      </div>
    </div>
  );
}
