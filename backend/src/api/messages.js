const { Router } = require('express');
const Message = require('../models/message.js');

const router = Router();

/**
 * @route GET /messages
 * @desc Returns all of the echo users messages
 * @access Private
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await Message.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /messages
 * @desc Creates a new message group
 * @access Public
 */
router.post('/', async (req, res, next) => {
  try {
    const users = new Message(req.body);
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
 * @route POST /message
 * @desc Updates the message array
 * @access Public
 */
router.put('/message', async (req, res, next) => {
  try {
    Message.findByIdAndUpdate(req.body.id, {
      $push: { messages: req.body.message },
    }).exec();

    res.json({ msg: 'sent' });
  } catch (error) {
    if (error.name === 'Validation Error') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
