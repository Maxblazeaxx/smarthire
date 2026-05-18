/**
 * Auth Routes
 * POST /api/login — Demo authentication (accepts any credentials)
 */

const express = require('express');
const router = express.Router();

/**
 * POST /api/login
 * Demo login — no real validation, any email+password combination works.
 * Returns a mock token and user info.
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Basic presence check (just to ensure the form was filled)
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  // Demo: derive a display name from the email
  const namePart = email.split('@')[0];
  const displayName = namePart
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Return mock token and user profile
  return res.json({
    success: true,
    message: 'Login successful',
    token: 'demo-token-smarthire-2024',
    user: {
      id: 'user-001',
      name: displayName || 'Recruiter',
      email,
      role: 'Recruiter',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6366f1&color=fff`,
    },
  });
});

module.exports = router;
