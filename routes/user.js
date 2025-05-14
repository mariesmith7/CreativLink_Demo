const express = require('express');
const router = express.Router(); //setting mini ex. router
const { ensureAuth } = require('../middleware/auth'); // auth middleware to see if user log in

router.get('/', (req, res) => {
  res.send('User dashboard placeholder');
});


// GET: artist dashboard (ejs)
router.get('/dashboard/artist', ensureAuth, (req, res) => {
  console.log('dashboard/artist')
  res.render('dashboard/artist', { user: req.user });
});


module.exports = router;