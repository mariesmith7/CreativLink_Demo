// handling signup, login, and logouts

const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// GET: signup page
router.get('/signup', (req, res) => {
  const role = req.query.role || 'visitor';
  res.render('signup', { role }); // sending the role to EJS to be selected
});


// POST: Signup Form
router.post('/signup', async (req, res) => {
  const { userName, email, password, role } = req.body;

  try {
    // suggest to use it to protect password
    // 10 is the number of salt rounds — more rounds = stronger encryption
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    // redirect to appropriate dashboard
    if (role === 'artist') return res.redirect('/dashboard/artist');
    if (role === 'curator') return res.redirect('/dashboard/curator');
    return res.redirect('/dashboard/visitor');

  } catch (err) {
    console.error('Signup error:', err);
    res.redirect('/signup');
  }
});


// GET: Login Page
router.get('/login', (req, res) => {
  const role = req.query.role || 'visitor';
  res.render('login', { role });
});


// POST: Login Form, custome call back 
router.post('/login', (req, res, next) => {
  console.log('Login attempt:', req.body.email); //** */

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('Passport error:', err);
      return next(err);
    }

    if (!user) {
      console.log('Login failed: no user returned'); //** */
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log('Login session error:', err); //** */
        return next(err);
      }

      console.log(`Login success! Redirecting user "${user.userName}" with role "${user.role}"`); //** */

      const role = user.role;
      if (role === 'artist') return res.redirect('/dashboard/artist');
      if (role === 'curator') return res.redirect('/dashboard/curator');
      return res.redirect('/dashboard/visitor');
    });
  })(req, res, next);
});


// GET: Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;

