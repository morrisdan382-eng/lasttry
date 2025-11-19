// routes/rooms.js
const express = require('express');
const router = express.Router();

// Mock data for rooms 1-5
const rooms = [
  { id: 1, name: 'Room 1' },
  { id: 2, name: 'Room 2' },
  { id: 3, name: 'Room 3' },
  { id: 4, name: 'Room 4' },
  { id: 5, name: 'Room 5' },
];

// GET /rooms
router.get('/', (req, res) => {
  res.json(rooms);
});

module.exports = router;
