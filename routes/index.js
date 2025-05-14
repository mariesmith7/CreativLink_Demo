
const express = require("express");
const router = express.Router();

// temporary hardcoded events - revised later with a forloop and api setup 
const sampleEvents = [
  {
    title: "Urban Expressions",
    date: "April 18 – May 30",
    location: "Philadelphia",
    description: "A bold collection of contemporary street art from East Coast creators.",
  },
  {
    title: "Haitian Roots",
    date: "May 12 – June 10",
    location: "Newark",
    description: "An exploration of heritage, culture, and identity through vibrant mixed media.",
  },
  {
    title: "Emerging Visions",
    date: "June 1 – July 8",
    location: "New York",
    description: "A juried showcase of new voices in sculpture and conceptual installations.",
  }
];

router.get("/", (req, res) => {
  res.render("index", {
    user: req.user || null,
    events: sampleEvents // send to the ejs file
  });
});

// defines what a file exports when its required
module.exports = router;