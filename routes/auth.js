const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

//user signup
//POST /auth/signup
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ email: new RegExp(`^${email}`, 'i') });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: 'This email is already registered' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    await user.save();

    assignTokenAndRespond(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

//user login
//POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: new RegExp(`^${email}`, 'i') });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'This email is not registered' });
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect password' });
    }

    assignTokenAndRespond(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// login with Google
// /auth/login-google
router.get(
  '/login-google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google_redirect',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

//user logout
//GET /auth/logout
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

function assignTokenAndRespond(res, user) {
  jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600
    },
    (error, token) => {
      if (error) {
        console.log(error);
        throw error;
      }

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    }
  );
}

module.exports = router;
