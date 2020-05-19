const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load Admin model
const { admin } = require('../models/admin');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        // Match user
        const adminUser = await admin.findOne({ email });
        if (!adminUser) {
          return done(null, false, {
            message: 'That email is not registered',
          });
        }

        // Match password
        bcrypt.compare(password, adminUser.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, adminUser);
          }
          return done(null, false, { message: 'Password incorrect' });
        });

        return false;
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    admin.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
