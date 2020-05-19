const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
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

        // Save new admin
        await newAdmin.save();
        res.json({ msg: 'success' });
      }
    } catch (err) {
      console.log(err);
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
router.post('/login', async (req, res, next) => {
  const { error } = loginValidation(req.body);

  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    passport.authenticate('login', async (passportError, admin, info) => {
      try {
        if (passportError || !admin) {
          return next(passportError);
        }

        // eslint-disable-next-line no-shadow
        req.login(admin, { session: false }, async (error) => {
          if (error) return next(error);

          // Create the JWT - Using email and ID
          // eslint-disable-next-line no-underscore-dangle
          const body = { _id: admin._id, email: admin.loginDetails.email };

          // Sign the token and set the payload body (admin id and emeail)
          const token = jwt.sign({ admin: body }, 'echo_humanitarian_secret');

          // Send the token back
          return res.json({ token });
        });
      } catch (err) {
        return next(err);
      }

      return false;
    })(req, res, next);
  }
});

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      admin: req.user,
      token: req.query.token,
    });
  },
);

module.exports = router;
