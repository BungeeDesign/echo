const { Router } = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {
  registerValidation,
  loginValidation,
} = require('../validation/validation');
const Admin = require('../models/admin.js');

const router = Router();

/**
 * @route GET /admins
 * @desc Returns all of the echo Admins
 * @access Private
 */
router.get('/', async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /register
 * @desc Register a new Admin
 * @access Public
 */
router.post('/register', async (req, res, next) => {
  const {
    name,
    organization,
    localHub,
    loginDetails: { email, password },
  } = req.body;

  const { error } = registerValidation(req.body);

  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    try {
      // Check if admin exisits
      const adminExisits = await Admin.findOne({ 'loginDetails.email': email });

      if (adminExisits) {
        res.json({ msg: 'Admin already exisits' });
      } else {
        const newAdmin = new Admin({
          name,
          organization,
          localHub,
          loginDetails: {
            email,
            password,
          },
        });

        // Hash Password (Argon 2 Refactor - When full JS version is out)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(
          newAdmin.loginDetails.password,
          salt,
        );

        // Set Password as Hash Password
        newAdmin.loginDetails.password = passwordHash;

        // Save new admin
        await newAdmin.save();
        res.json({ msg: 'success' });
      }
    } catch (err) {
      if (err.name === 'Validation Error') {
        res.status(422);
      }
      next(error);
    }
  }
});

/**
 * @route POST /login
 * @desc Login route for admin
 * @access Public
 */
router.post('/login', (req, res, next) => {
  const { error } = loginValidation(req.body);

  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    try {
      passport.authenticate('local', (err, user, info) => {
        if (!user) {
          return res.status(400).send([user, 'Cannot log in', info]);
        }

        req.login(user, () => {
          res.send('Logged in');
        });

        return false;
      })(req, res, next);
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(422);
      }
      next(err);
    }
  }
});

module.exports = router;
