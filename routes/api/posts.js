const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.get("/",[auth,[
  check('text','Text is required').not().isEmpty()
]], async(req,res) => {
  res.send("posts routes")
})

module.exports = router;