const express = require('express');
const router = express.Router();

// Mock data: current temperature and target for each room
const temperature = [
  { roomId: 1, current: 24, target: 22 },
  { roomId: 2, current: 23, target: 22 },
  { roomId: 3, current: 25, target: 24 },
  { roomId: 4, current: 22, target: 22 },
  { roomId: 5, current: 24, target: 23 },
];

// GET /temperature
router.get('/', (req, res) => {
  res.json(temperature);
});

// PUT /temperature/:roomId to update target temperature
router.put('/:roomId', (req, res) => {
  const roomId = parseInt(req.params.roomId);
  const { target } = req.body;

  const roomTemp = temperature.find(t => t.roomId === roomId);
  if (!roomTemp) return res.status(404).json({ message: 'Room not found' });

  if (target !== undefined) roomTemp.target = target;

  res.json(roomTemp);
});

module.exports = router;
