const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password should be 6 or more characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //get user data from request
    const { name, email, password } = req.body;

    try {
      //check if user exists
      let user = await User.findOne({ email });
      if (user)
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      //generate user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      //create user object and encrypt password
      user = new User({
        name,
        email,
        avatar,
        password: await bcrypt.hash(password, 12)
      });

      //save user to database
      await user.save();

      //create payload for JWT
      const payload = {
        user: {
          id: user.id
        }
      };

      //generate token
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
