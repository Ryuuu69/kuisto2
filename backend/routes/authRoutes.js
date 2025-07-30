const express = require('express');
const { login, getMe } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes publiques
router.post('/login', login);

// Routes protégées
router.get('/me', authenticateToken, getMe);

module.exports = router;