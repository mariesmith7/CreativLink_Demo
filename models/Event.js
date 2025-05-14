const mongoose = require('mongoose');

// schema structure for an event
const EventSchema = new mongoose.Schema({

  title: { type: String, required: true },
  description: String,
  // event date
  date: String,

// location
  location: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

// export
module.exports = mongoose.model('Event', EventSchema);