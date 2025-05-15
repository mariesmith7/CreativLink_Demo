/* const axios = require('axios') // npm install 
const express = require('express')
const router = express.Router()


router.get('/events', async (req, res) => {
  try {
    const response = await axios.get('https://www.eventbriteapi.com/v3/events/search', {
      headers: {
          Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}`,
        },
        params: {
          'location.address': 'new york',
          'expand': 'location',
      }
  })

    res.json(response.data.events)

  } catch (err) {
    console.error('Event API error:', err)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
})

module.exports = router

*/


const axios = require('axios');
const express = require('express');
const router = express.Router();

// GET: Fetch events from Eventbrite
router.get('/events', async (req, res) => {
  try {
    const response = await axios.get('https://www.eventbriteapi.com/v3/events/search', {
      headers: {
        'Authorization': `Bearer ${process.env.EVENTBRITE_TOKEN}`,
        'Accept': 'application/json'
      },
      params: {
        'location.address': 'new york', 
        'expand': 'venue' //'location' will throw 404
      }
    });

    res.json(response.data.events); // return the event array
  } catch (err) {
    console.error('Event API error:', err);
    res.status(500).json({ error: 'Failed to fetch events from Eventbrite.' });
  }
}); 

module.exports = router;