const { Router } = require('express');
const User = require('../models/user.js');

const router = Router();

/**
 * @route GET /users
 * @desc Returns all of the echo App users
 * @access Private
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /users
 * @desc Creates a new user
 * @access Public
 */
router.post('/', async (req, res, next) => {
  try {
    const users = new User(req.body);
    const createdUser = await users.save();

    res.json(createdUser);
  } catch (error) {
    if (error.name === 'Validation Error') {
      res.status(422);
    }
    next(error);
  }
});

/**
 * @route POST /sos
 * @desc Triggers the SOS Alert
 * @access Private
 */
router.post('/sos', async (req, res, next) => {
  try {
    // Update the users SOS value
    let user = await User.findById(req.body.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user = await User.findByIdAndUpdate(
      req.body.id,
      { $set: { 'sos.active': req.body.state } },
      { new: true },
    );

    const io = req.app.get('io');
    io.emit('sosAlert', req.body);
    res.json({ done: 'yessss' });
  } catch (error) {
    if (error.name === 'Validation Error') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
