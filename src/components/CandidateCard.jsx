import React from 'react';
import { Trophy, CheckCircle, XCircle, User } from 'lucide-react';

/**
 * Recommendation badge styling helper
 */
function getBadgeClass(recommendation) {
  if (recommendation === 'Highly Recommended') return 'badge-high';
  if (recommendation === 'Moderate Match') return 'badge-moderate';
  return 'badge-low';
}

/**
 * Score color helper
 */
function getScoreColor(score) {
  if (score >= 70) return '#10b981'; // emerald
  if (score >= 40) return '#f59e0b'; // amber
  return '#f43f5e'; // rose
}

/**
 * Circular SVG progress ring
 */
function ScoreRing({ score, color }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg width="80" height="80" className="-rotate-90">
        {/* Background ring */}
        <circle
          cx="40" cy="40" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="6"
        />
        {/* Progress ring */}
        <circle
          cx="40" cy="40" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <span
        className="absolute text-sm font-bold"
        style={{ color }}
      >
        {score}%
      </span>
    </div>
  );
}

/**
 * CandidateCard — displays a ranked resume result.
 * Props:
 *   - candidate: { rank, name, filename, score, matched, missing, recommendation, isBest }
 *   - darkMode: boolean
 */
export default function CandidateCard({ candidate, darkMode }) {
  const {
    rank,
    name,
    score,
    matched = [],
    missing = [],
    recommendation,
    isBest,
  } = candidate;

  const scoreColor = getScoreColor(score);

  return (
    <div
      className={`glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden ${
        isBest ? 'glow-card' : ''
      }`}
      style={{
        borderColor: isBest ? 'rgba(99,102,241,0.5)' : undefined,
        background: isBest
          ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))'
          : undefined,
      }}
    >
      {/* Best badge ribbon */}
      {isBest && (
        <div
          className="absolute top-0 right-0 px-4 py-1 text-xs font-bold text-white flex items-center gap-1"
          style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
        >
          <Trophy size={12} />
          Best Match
        </div>
      )}

      {/* Header row */}
      <div className="flex items-start gap-4">
        {/* Rank badge */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{
            background: isBest
              ? 'linear-gradient(135deg, #6366f1, #a855f7)'
              : 'rgba(255,255,255,0.1)',
          }}
        >
          #{rank}
        </div>

        {/* Name + recommendation */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-semibold text-base truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              {name}
            </h3>
            <span className={getBadgeClass(recommendation)}>
              {recommendation}
            </span>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <User size={11} className="inline mr-1" />
            Candidate #{rank}
          </p>
        </div>

        {/* Score ring */}
        <ScoreRing score={score} color={scoreColor} />
      </div>

      {/* Divider */}
      <div className={`my-4 border-t ${darkMode ? 'border-white/8' : 'border-slate-200'}`} />

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Matched Skills */}
        <div>
          <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <CheckCircle size={12} className="text-emerald-400" />
            Matched Skills ({matched.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {matched.length > 0 ? (
              matched.map((skill) => (
                <span key={skill} className="skill-tag skill-tag-matched">
                  {skill}
                </span>
              ))
            ) : (
              <span className={`text-xs ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                None matched
              </span>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <XCircle size={12} className="text-rose-400" />
            Missing Skills ({missing.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missing.length > 0 ? (
              missing.map((skill) => (
                <span key={skill} className="skill-tag skill-tag-missing">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-emerald-400">All skills matched! 🎉</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
