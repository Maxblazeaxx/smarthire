import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, FileText } from 'lucide-react';

/**
 * UploadZone — drag-and-drop file upload area.
 * Accepts PDF and DOCX files (max 4).
 *
 * Props:
 *   - files: File[] — currently selected files
 *   - onFilesChange: (files: File[]) => void
 *   - darkMode: boolean
 */
export default function UploadZone({ files, onFilesChange, darkMode }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Merge with existing, cap at 4
      const merged = [...files, ...acceptedFiles].slice(0, 4);
      onFilesChange(merged);
    },
    [files, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 4,
    multiple: true,
  });

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
          transition-all duration-200
          ${isDragActive ? 'dropzone-active' : ''}
          ${darkMode
            ? 'border-white/20 hover:border-primary-500/60 hover:bg-primary-500/5'
            : 'border-slate-300 hover:border-primary-400 hover:bg-primary-50'
          }
        `}
        id="upload-dropzone"
      >
        <input {...getInputProps()} id="resume-file-input" />

        <div className="flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))' }}
          >
            <Upload size={24} className="text-primary-400" />
          </div>

          {isDragActive ? (
            <p className="text-primary-400 font-semibold">Drop your resumes here...</p>
          ) : (
            <>
              <div>
                <p className={`font-semibold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  Drag & drop resumes here
                </p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  or{' '}
                  <span className="text-primary-400 font-medium underline underline-offset-2">
                    browse files
                  </span>
                </p>
              </div>
              <div className={`flex gap-3 text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                <span className="px-2 py-1 rounded bg-slate-500/10">PDF</span>
                <span className="px-2 py-1 rounded bg-slate-500/10">DOCX</span>
                <span className="px-2 py-1 rounded bg-slate-500/10">Max 4 files</span>
                <span className="px-2 py-1 rounded bg-slate-500/10">10 MB each</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Selected Files ({files.length}/4)
          </p>
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'
              }`}
            >
              <FileText size={18} className="text-primary-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {file.name}
                </p>
                <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {formatSize(file.size)}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                className={`p-1.5 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-rose-500/20 text-slate-500 hover:text-rose-400' : 'hover:bg-rose-50 text-slate-400 hover:text-rose-500'
                }`}
                aria-label={`Remove ${file.name}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
