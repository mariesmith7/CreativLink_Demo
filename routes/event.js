//control the URL routes and HTTP logic for events
// 
/* const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Event page placeholder');
});

module.exports = router; */

// routes/event.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Event = require("../models/Event.js");


router.get('/', async (req, res) => {
  const userLocation = req.query.location || 'new york'; // placeholder location
  const token = process.env.EVENTBRITE_TOKEN;

  try {
    const response = await axios.get('https://www.eventbriteapi.com/v3/events/search', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        'location.address': userLocation,
        'categories': '105', // arts category - 105
        'expand': 'venue'
      }
    });

    const events = response.data.events.map(e => ({
      title: e.name.text || 'Untitled',
      description: e.description.text || 'No description available.',
      date: e.start.local || 'Date TBA',
      location: e.venue?.address?.localized_address_display || 'TBA'
    }));

    res.render('events', { events });

  } catch (err) {
    console.error('Event API error:', err);
    res.render('events', { events: [] });
  }
});

//POST
router.post("/create", async (req, res) => {

  try {
    await Event.create({
      title: req.body.title,
      description: req.body.description,
      // image: result.secure_url,
      date: req.body.date,
      location: req.body.location,
      createdBy: req.user.id,
     // cloudinaryId: result.public_id,
    });  
    console.log("Event has been added!");
    res.redirect("/curator");
  }

  catch (err) {
    console.error('Event API error:', err);
    res.render('events', { events: [] }); //*
  }
});


module.exports = router;

/*
 title: { type: String, required: true },
  description: String,
  // event date
  date: String,

// location
  location: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',*/