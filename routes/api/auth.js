const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Test routes
// @access  Public
router.get("/",(req,res) => {
  res.send("auth routes")
})

module.exports = router;