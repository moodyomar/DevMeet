const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');


// @route   GET api/auth
// @desc    Test routes
// @access  Public
router.get("/", auth, async(req,res) => {
  try{
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
  } catch(err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
  
})

// @route   POST api/auth
// @desc    Authenticate user & git token
// @access  Public
router.post("/", [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // see if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credintals' }] });
    }

    // make sure that the password is match
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({ errors: [{ msg: 'Invalid Credintals' }] });
    }

const payload = {
  user:{
    id:user.id
  }
}

jwt.sign(
  payload,
  config.get('jwtSecret'),
  {expiresIn:"3600000"},
  (err,token) => {
    if(err) throw err;
    res.json({token})
  });

  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }

})


module.exports = router;