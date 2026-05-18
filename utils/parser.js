/**
 * Resume Parser & Scoring Utility
 * Supports PDF and DOCX files.
 * Uses keyword matching to score resumes against job requirements.
 */

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// ─── Common Tech Skills Dictionary ──────────────────────────────────────────
// Used to normalize and expand skill keywords
const SKILL_ALIASES = {
  'js': 'javascript',
  'ts': 'typescript',
  'node': 'node.js',
  'nodejs': 'node.js',
  'react': 'react.js',
  'reactjs': 'react.js',
  'vue': 'vue.js',
  'vuejs': 'vue.js',
  'mongo': 'mongodb',
  'postgres': 'postgresql',
  'k8s': 'kubernetes',
  'ml': 'machine learning',
  'dl': 'deep learning',
  'ai': 'artificial intelligence',
  'ci/cd': 'cicd',
  'rest': 'rest api',
  'graphql': 'graphql',
};

/**
 * Normalize a skill string: lowercase, trim, apply aliases
 * @param {string} skill
 * @returns {string}
 */
function normalizeSkill(skill) {
  const lower = skill.toLowerCase().trim();
  return SKILL_ALIASES[lower] || lower;
}

/**
 * Extract plain text from a PDF buffer
 * @param {Buffer} buffer
 * @returns {Promise<string>}
 */
async function extractFromPDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text || '';
  } catch (err) {
    console.error('PDF parse error:', err.message);
    return '';
  }
}

/**
 * Extract plain text from a DOCX buffer
 * @param {Buffer} buffer
 * @returns {Promise<string>}
 */
async function extractFromDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  } catch (err) {
    console.error('DOCX parse error:', err.message);
    return '';
  }
}

/**
 * Extract text from a resume file (PDF or DOCX)
 * @param {Buffer} buffer - File buffer from memory storage
 * @param {string} mimetype - File mime type
 * @param {string} originalname - File original name
 * @returns {Promise<string>}
 */
async function extractText(buffer, mimetype, originalname) {
  const ext = path.extname(originalname).toLowerCase();

  if (ext === '.pdf' || mimetype === 'application/pdf') {
    return extractFromPDF(buffer);
  }

  if (
    ext === '.docx' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return extractFromDOCX(buffer);
  }

  // Fallback: treat as plain text (handles .txt and unknown types)
  return buffer.toString('utf-8');
}

/**
 * Parse job description / skills input into individual keywords
 * @param {string} jobInput - Free-form text or comma-separated skills
 * @returns {string[]} - Array of normalized skill keywords
 */
function parseJobSkills(jobInput) {
  if (!jobInput) return [];

  // Split by common delimiters: comma, newline, semicolon, bullet
  const raw = jobInput.split(/[,\n;•·\-]+/);

  return raw
    .map((s) => normalizeSkill(s.trim()))
    .filter((s) => s.length > 1); // Filter out single chars
}

/**
 * Score a resume text against a list of job skill keywords
 * @param {string} resumeText - Extracted resume text
 * @param {string[]} jobSkills - Array of normalized job skills
 * @returns {{ score: number, matched: string[], missing: string[] }}
 */
function scoreResume(resumeText, jobSkills) {
  if (!jobSkills.length) return { score: 0, matched: [], missing: [] };

  const resumeLower = resumeText.toLowerCase();
  const matched = [];
  const missing = [];

  for (const skill of jobSkills) {
    // Check if the skill (or any alias) appears in the resume text
    const found = resumeLower.includes(skill);
    if (found) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  }

  const score = Math.round((matched.length / jobSkills.length) * 100);
  return { score, matched, missing };
}

/**
 * Assign a recommendation badge based on match score
 * @param {number} score
 * @returns {string}
 */
function getRecommendation(score) {
  if (score >= 70) return 'Highly Recommended';
  if (score >= 40) return 'Moderate Match';
  return 'Low Match';
}

/**
 * Analyze multiple resume files against a job description
 * @param {Array<{ path: string, originalname: string, mimetype: string }>} files
 * @param {string} jobDescription
 * @returns {Promise<Array>} - Sorted array of candidate results
 */
async function analyzeResumes(files, jobDescription) {
  const jobSkills = parseJobSkills(jobDescription);

  const results = await Promise.all(
    files.map(async (file, index) => {
      const text = await extractText(file.buffer, file.mimetype, file.originalname);
      const { score, matched, missing } = scoreResume(text, jobSkills);
      const recommendation = getRecommendation(score);

      return {
        id: index + 1,
        name: file.originalname.replace(/\.(pdf|docx)$/i, ''),
        filename: file.originalname,
        score,
        matched,
        missing,
        recommendation,
        textLength: text.length,
        rank: 0, // assigned after sorting
      };
    })
  );

  // Sort by score descending and assign ranks
  results.sort((a, b) => b.score - a.score);
  results.forEach((r, i) => {
    r.rank = i + 1;
    r.isBest = i === 0;
  });

  return results;
}

module.exports = { analyzeResumes, parseJobSkills, extractText };
