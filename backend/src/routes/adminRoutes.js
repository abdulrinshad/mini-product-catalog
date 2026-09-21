const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// @desc    Test admin route
// @route   GET /api/admin/test
// @access  Private/Admin
router.get('/test', protect, admin, (req, res) => {
  return res.status(200).json({
    message: 'Admin access granted',
  });
});

module.exports = router;
