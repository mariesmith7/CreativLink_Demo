const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// POST route for AI search
router.post('/ai', async function (req, res) {
  const userSearch = req.body.query;

  try {
    // Get - event data from Eventbrite API route
    const eventResponse = await fetch('http://localhost:3000/api/events');
    const eventData = await eventResponse.json();

    // list of strings for AI 
    const documents = [];

    for (let i = 0; i < eventData.length; i++) {
      const event = eventData[i];

      // if some of the data is missing
      const title = event.name && event.name.text ? event.name.text : 'Untitled Event';
      const venue = event.venue && event.venue.name ? event.venue.name : 'Venue To Be Announced';
      const description = event.description && event.description.text ? event.description.text : 'No description';

      const combined = title + ' — ' + venue + '. ' + description;
      documents.push(combined);
    }

    // send  search and documents to Cohere to get the the closes match, tops 5 max 
    const cohereResponse = await fetch('https://api.cohere.ai/v1/rerank', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.COHERE_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: userSearch,
        documents: documents,
        top_n: 5
      })
    });

    const cohereData = await cohereResponse.json();

    // match the top results to original event data
    const topResults = [];

    for (let j = 0; j < cohereData.results.length; j++) {
      const result = cohereData.results[j];
      const index = result.index;

      const matchedEvent = eventData[index];

      const resultObj = {
        title: matchedEvent.name.text,
        venue: matchedEvent.venue && matchedEvent.venue.name ? matchedEvent.venue.name : 'Venue To Be Announced',
        description: matchedEvent.description && matchedEvent.description.text
          ? matchedEvent.description.text
          : 'No description',
        url: matchedEvent.url
      };

      topResults.push(resultObj);
    }

    //sending AI results to the frontend
    res.json({ results: topResults });

  } catch (error) {
    console.error('AI search failed:', error);
    res.status(500).json({ error: 'Something went wrong with the AI search.' });
  }
});

module.exports = router;