const express = require('express');
const router = express.Router();

// @route   GET api/profiles
// @desc    Test routes
// @access  Public
router.get("/",(req,res) => {
  res.send("profiles routes")
})

module.exports = router;