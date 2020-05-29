const { Router } = require('express');
const Hub = require('../models/hub.js');

const router = Router();

/**
 * @route GET /hubs
 * @desc Returns all of connected hubs
 * @access Public
 */
router.get('/', async (req, res, next) => {
  try {
    const hubs = await Hub.find();
    res.json(hubs);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /hubs
 * @desc Creates a new hub
 * @access Public
 */
router.post('/', async (req, res, next) => {
  const {
    name,
    location: { lat, long },
    // eslint-disable-next-line object-curly-newline
    stats: { airQuality, waterLevel, battery, videoFeed },
  } = req.body;

  try {
    // Check if hub exists
    const adminExisits = await Hub.findOne({ name });

    if (adminExisits) {
      res.json({ msg: 'Admin already exisits' });
    } else {
      const newHub = new Hub({
        name,
        location: {
          lat,
          long,
        },
        stats: {
          airQuality,
          waterLevel,
          battery,
          videoFeed,
        },
      });

      // Save new admin
      await newHub.save();
      res.json({ msg: 'success' });
    }
  } catch (err) {
    if (err.name === 'Validation Error') {
      res.status(422);
    }
    next(err);
  }
});

module.exports = router;
