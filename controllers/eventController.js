const Event = require('../models/event');

// Create Event
function createEvent(req, res) {
  const { title, description, date, createdBy } = req.body;
  const newEvent = new Event({ title, description, date, createdBy });

  newEvent.save()
    .then(() => {
      res.status(201).json({ message: 'Event created successfully' });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Get All Events
function getAllEvents(req, res) {
  Event.find({})
    .populate('createdBy', 'firstName lastName')
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Get Single Event
function getEventById(req, res) {
  Event.findById(req.params.id)
    .populate('createdBy', 'firstName lastName')
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(event);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}
function updateEvent(req, res) {
    const { id } = req.params; // Get the ID from the URL
    const updatedData = req.body; // Get the data to update
  
    Event.findByIdAndUpdate(id, updatedData, { new: true }) // { new: true } returns the updated document
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  }
  function deleteEvent(req, res) {
    const { id } = req.params; // Get the ID from the URL
  
    Event.findByIdAndDelete(id)
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
  
module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
