const express = require('express');
const router = express.Router();
const { 
  login, 
  logout, 
  verify,
  getProfile 
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes (no authentication needed)
router.post('/login', login);
router.get('/verify', verify);

// Protected routes (require authentication)
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;