import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import axios from 'axios';
import CandidateCard from '../components/CandidateCard';
import { Trophy, RefreshCw, Upload, AlertCircle, Sparkles } from 'lucide-react';

/**
 * ResultsPage — displays ranked resume analysis results.
 * Fetches from router state on mount.
 * Shows "Best Resume Selected" banner when results exist.
 */
export default function ResultsPage() {
  const [results, setResults] = useState(null);
  const [bestCandidate, setBestCandidate] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useOutletContext();

  useEffect(() => {
    fetchResults();
  }, [location.state]);

  const fetchResults = () => {
    setIsLoading(true);
    setError('');
    
    if (location.state && location.state.results) {
      setResults(location.state.results);
      setBestCandidate(location.state.bestCandidate);
      setJobDescription(location.state.jobDescription || '');
    } else {
      setError('no-results');
    }
    
    setIsLoading(false);
  };

  // ─── Loading State ───────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Loading results...</p>
      </div>
    );
  }

  // ─── No Results Yet ──────────────────────────────────────────────────────
  if (error === 'no-results') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-5 text-center animate-fade-in">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))' }}
        >
          <Sparkles size={32} className="text-primary-400" />
        </div>
        <div>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            No Results Yet
          </h2>
          <p className={`text-sm mt-2 max-w-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Upload some resumes and run the analysis first to see ranked results here.
          </p>
        </div>
        <button
          id="go-upload-btn"
          onClick={() => navigate('/upload')}
          className="gradient-btn flex items-center gap-2"
        >
          <Upload size={16} />
          Upload Resumes
        </button>
      </div>
    );
  }

  // ─── General Error ───────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
        <button onClick={fetchResults} className="gradient-btn flex items-center gap-2">
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  // ─── Results ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Analysis Results
          </h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {results?.length} resume{results?.length !== 1 ? 's' : ''} ranked by match score
          </p>
        </div>
        <div className="flex gap-3">
          <button
            id="refresh-results-btn"
            onClick={fetchResults}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              darkMode ? 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10' : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
            }`}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <button
            id="new-analysis-btn"
            onClick={() => navigate('/upload')}
            className="gradient-btn flex items-center gap-2 py-2"
          >
            <Upload size={14} />
            New Analysis
          </button>
        </div>
      </div>

      {/* Best Resume Selected Banner */}
      {bestCandidate && (
        <div
          className="relative overflow-hidden rounded-2xl p-5 flex items-center gap-4 animate-bounce-in"
          style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
        >
          {/* Background shimmer */}
          <div className="absolute inset-0 shimmer opacity-30" />

          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 relative z-10">
            <Trophy size={22} className="text-white" />
          </div>
          <div className="relative z-10 flex-1">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">
              🏆 Best Resume Selected
            </p>
            <h2 className="text-white font-bold text-lg leading-tight">
              {bestCandidate.name}
            </h2>
            <p className="text-white/80 text-sm">
              {bestCandidate.score}% match · {bestCandidate.matched.length} skills matched
            </p>
          </div>
          <div className="text-right relative z-10 hidden sm:block">
            <div className="text-white font-black text-3xl">{bestCandidate.score}%</div>
            <div className="text-white/60 text-xs">Match Score</div>
          </div>
        </div>
      )}

      {/* Job Description chip */}
      {jobDescription && (
        <div className={`px-4 py-3 rounded-xl text-sm ${
          darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'
        }`}>
          <span className={`font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Job Skills:{' '}
          </span>
          <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{jobDescription}</span>
        </div>
      )}

      {/* Ranked Candidate Cards */}
      <div className="space-y-4">
        {results?.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            darkMode={darkMode}
          />
        ))}
      </div>

      {/* Summary stats footer */}
      {results && results.length > 0 && (
        <div className="glass-card p-5 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              {results.length}
            </p>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Resumes Analyzed
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-400">
              {results[0]?.score ?? 0}%
            </p>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Top Match Score
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-400">
              {results.filter((r) => r.recommendation === 'Highly Recommended').length}
            </p>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Highly Recommended
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
