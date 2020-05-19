const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Admin = require('../models/admin.js');

// Passport middleware to handle admin login
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const admin = await Admin.findOne({ 'loginDetails.email': email });

        if (!admin) {
          return done({ message: 'Admin not found' });
        }

        // Using the method we defined in the admin model check if it's a valid password
        const validate = await admin.isValidPassword(password);
        if (!validate) {
          return done({ message: 'Wrong Password' });
        }
        return done(null, admin, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'echo_humanitarian_secret',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token'),
    },
    async (token, done) => {
      try {
        return done(null, token.admin);
      } catch (error) {
        done(error);
      }

      return false;
    },
  ),
);
