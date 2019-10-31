const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Get current user information
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      //find user in database
      let user = await User.findOne({ email });

      //if user with email does not exist return
      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credential' }] });

      //compare entered password with user password
      if (!(await bcrypt.compare(password, user.password)))
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credential' }] });

      const payload = {
        user: {
          id: user.id
        }
      };

      //generate token
      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '1h'
      });

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
