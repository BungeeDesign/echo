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

module.exports = router;
