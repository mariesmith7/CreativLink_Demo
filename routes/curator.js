// routes/curator.js

const dashboardController = require("../controllers/dashboard");
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth'); 

// curator- dashboard
router.get('/', ensureAuth, dashboardController.getCuratorPage)

module.exports = router;










/*
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Event = require('../models/Event'); // Or your event schema

// GET - curator dashboard
router.get('/curator', ensureAuth, (req, res) => {
  res.render('dashboard/curator', {
    user: req.user,
  });
});

// POST- create vvent
router.post('/create-event', ensureAuth, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    await Event.create({
      title,
      description,
      date,
      location,
      createdBy: req.user.id,
    });

    res.redirect('/dashboard/curator');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard/curator');
  }
});

module.exports = router;

*/