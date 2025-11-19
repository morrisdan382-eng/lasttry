const express = require('express');
const router = express.Router();

// Mock data for lights in each room
const lights = [
  { id: 1, roomId: 1, status: 'off', brightness: 0 },
  { id: 2, roomId: 2, status: 'on', brightness: 75 },
  { id: 3, roomId: 3, status: 'off', brightness: 0 },
  { id: 4, roomId: 4, status: 'on', brightness: 50 },
  { id: 5, roomId: 5, status: 'off', brightness: 0 },
];

// GET /lights
router.get('/', (req, res) => {
  res.json(lights);
});

// PUT /lights/:id to update light status or brightness
router.put('/:id', (req, res) => {
  const lightId = parseInt(req.params.id);
  const { status, brightness } = req.body;

  const light = lights.find(l => l.id === lightId);
  if (!light) return res.status(404).json({ message: 'Light not found' });

  if (status) light.status = status;
  if (brightness !== undefined) light.brightness = brightness;

  res.json(light);
});

module.exports = router;
