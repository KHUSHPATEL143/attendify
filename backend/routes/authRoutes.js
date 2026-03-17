const express = require('express');
const { staffLogin, studentLogin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/staff-login', staffLogin);
router.post('/student-login', studentLogin);
router.get('/me', protect, getMe);

module.exports = router;
