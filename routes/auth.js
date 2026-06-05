const express = require('express');
const passport = require('passport');

const router = express.Router();

// Starts Google OAuth login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Google sends the user back here after login
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure'
  }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

// Confirms successful login
router.get('/success', (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Not authenticated'
    });
  }

  return res.status(200).json({
    message: 'Successfully logged in with Google',
    user: {
      id: req.user._id,
      displayName: req.user.displayName,
      email: req.user.email
    }
  });
});

// Handles failed login
router.get('/failure', (req, res) => {
  return res.status(401).json({
    message: 'Google authentication failed'
  });
});

// Checks whether the current user is logged in
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      authenticated: true,
      user: {
        id: req.user._id,
        displayName: req.user.displayName,
        email: req.user.email
      }
    });
  }

  return res.status(200).json({
    authenticated: false
  });
});

// Logs the user out
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    return res.status(200).json({
      message: 'Successfully logged out'
    });
  });
});

module.exports = router;