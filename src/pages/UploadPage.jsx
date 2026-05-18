import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import UploadZone from '../components/UploadZone';
import ProgressBar from '../components/ProgressBar';
import { Sparkles, ArrowRight, AlertCircle, Lightbulb } from 'lucide-react';

const SAMPLE_JOB_DESCRIPTIONS = [
  'React.js, Node.js, MongoDB, JavaScript, REST API, Git, CSS',
  'Python, Machine Learning, TensorFlow, Pandas, SQL, Data Analysis',
  'Java, Spring Boot, Microservices, Docker, Kubernetes, AWS',
  'React Native, TypeScript, Firebase, Redux, Mobile Development',
];

/**
 * UploadPage — file upload + job description form.
 * Submits to /api/analyze and navigates to /results on success.
 */
export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { darkMode } = useOutletContext();

  /**
   * Simulates incremental progress while the real upload happens
   */
  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 12) + 5;
      });
    }, 200);
    return interval;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (files.length === 0) {
      setError('Please upload at least one resume.');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please enter required skills or a job description.');
      return;
    }

    setIsUploading(true);
    const progressInterval = simulateProgress();

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('resumes', file));
      formData.append('jobDescription', jobDescription);

      const res = await axios.post('/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          if (event.total) {
            const pct = Math.round((event.loaded / event.total) * 90);
            setProgress(pct);
          }
        },
      });

      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => navigate('/results', { state: res.data }), 600);
    } catch (err) {
      clearInterval(progressInterval);
      setProgress(0);
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Upload Resumes
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Upload 1–4 resumes and describe the role to find the best match.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" id="upload-form">
        {/* Upload Zone */}
        <div className="glass-card p-6">
          <h2 className={`font-semibold text-base mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            📎 Resume Files
          </h2>
          <UploadZone files={files} onFilesChange={setFiles} darkMode={darkMode} />
        </div>

        {/* Job Description */}
        <div className="glass-card p-6">
          <h2 className={`font-semibold text-base mb-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            🎯 Job Requirements
          </h2>
          <p className={`text-xs mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Enter required skills (comma-separated) or paste the full job description.
          </p>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="e.g. React.js, Node.js, MongoDB, REST API, TypeScript, Git..."
            rows={5}
            className={`w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all focus:ring-2 focus:ring-primary-500/40 ${
              darkMode
                ? 'bg-white/5 border border-white/10 text-white placeholder-slate-600'
                : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400'
            }`}
          />

          {/* Quick-fill buttons */}
          <div className="mt-3">
            <p className={`text-xs mb-2 flex items-center gap-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <Lightbulb size={12} />
              Quick fill examples:
            </p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_JOB_DESCRIPTIONS.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setJobDescription(sample)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-white/5 hover:bg-primary-500/20 text-slate-400 hover:text-primary-300 border border-white/10'
                      : 'bg-slate-100 hover:bg-primary-50 text-slate-500 hover:text-primary-600 border border-slate-200'
                  }`}
                >
                  {sample.split(',')[0].trim()}...
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar (shown during upload) */}
        {isUploading && (
          <div className="glass-card p-5">
            <ProgressBar
              progress={progress}
              label={progress < 90 ? 'Uploading & analyzing resumes...' : 'Finalizing results...'}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
            <AlertCircle size={16} className="flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          id="analyze-btn"
          type="submit"
          disabled={isUploading || files.length === 0}
          className="gradient-btn w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles size={18} />
              Analyze & Rank Resumes
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
