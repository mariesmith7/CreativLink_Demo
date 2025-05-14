const Event = require("../models/Event.js");


module.exports = {
  getArtistPage: (req, res) => {
    res.render('artist.ejs', {
      user: req.user,
    });
  }, 
  getVisitorPage: (req, res) => {
    res.render('visitor.ejs', {
      user: req.user,
    });
  }, 
  getCuratorPage: async (req, res) => { 
    const events = await Event.find({
      createdBy:req.user.id
    });
   
   
    res.render('curator.ejs', {
      user: req.user,
      events: events,
    });
  }, 
};

