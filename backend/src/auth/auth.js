// const logger = require('../logger');
module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({ msg: 'Not Authenticated To Acccess' });
    return false;
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
    return false;
  },
};
