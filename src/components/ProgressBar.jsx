import React from 'react';

/**
 * ProgressBar — animated upload progress indicator.
 *
 * Props:
 *   - progress: number (0–100)
 *   - label: string (optional)
 *   - darkMode: boolean
 */
export default function ProgressBar({ progress, label = 'Uploading...', darkMode }) {
  return (
    <div className="space-y-2">
      {/* Label row */}
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {label}
        </span>
        <span className="text-sm font-bold text-primary-400">{progress}%</span>
      </div>

      {/* Track */}
      <div
        className="w-full h-2.5 rounded-full overflow-hidden"
        style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(99,102,241,0.1)' }}
      >
        {/* Fill */}
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #6366f1, #a855f7)',
          }}
        >
          {/* Shimmer overlay */}
          <div className="w-full h-full shimmer" />
        </div>
      </div>
    </div>
  );
}
