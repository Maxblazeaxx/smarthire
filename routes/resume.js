/**
 * Resume Routes
 * POST /api/upload   — Upload 1–4 resume files (stateless)
 * POST /api/analyze  — Analyze uploaded resumes vs job description
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeResumes } = require('../utils/parser');

// ─── Multer Configuration ────────────────────────────────────────────────────
const storage = multer.memoryStorage(); // Use memory storage for Vercel

const fileFilter = (req, file, cb) => {
  const allowed = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain', // Allow .txt for testing with sample resumes
  ];
  const ext = file.originalname.split('.').pop().toLowerCase();
  const allowedExts = ['pdf', 'docx', 'txt'];

  if (allowed.includes(file.mimetype) || allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOCX, and TXT files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
});

// ─── POST /api/upload ────────────────────────────────────────────────────────
/**
 * Upload 1–4 resume files.
 * Files are processed in memory and just acknowledged here.
 */
router.post('/upload', upload.array('resumes', 4), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No files uploaded.' });
  }

  const fileList = req.files.map((f) => ({
    name: f.originalname,
    size: f.size,
    mimetype: f.mimetype,
  }));

  return res.json({
    success: true,
    message: `${req.files.length} resume(s) uploaded successfully.`,
    files: fileList,
  });
});

// ─── POST /api/analyze ───────────────────────────────────────────────────────
/**
 * Analyze uploaded resumes against the provided job description.
 * Accepts files + jobDescription in a multipart/form-data request.
 */
router.post('/analyze', upload.array('resumes', 4), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription || '';
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one resume before analyzing.',
      });
    }

    if (!jobDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Job description or required skills cannot be empty.',
      });
    }

    // Run analysis
    const results = await analyzeResumes(files, jobDescription);

    return res.json({
      success: true,
      jobDescription,
      totalResumes: results.length,
      results,
      bestCandidate: results[0] || null,
    });
  } catch (err) {
    console.error('Analysis error:', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
