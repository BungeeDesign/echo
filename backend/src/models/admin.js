const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const adminsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  localHub: {
    type: String,
    required: true,
  },
  loginDetails: {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
});

// Has the password before we store in the database - using the mongoose prehook
// Note the use of non ES6 arrow functions when refercening "this"
// eslint-disable-next-line func-names
adminsSchema.pre('save', async function (next) {
  const admin = this;
  const hash = await bcrypt.hash(admin.loginDetails.password, 10);

  // Replace the plain text password with the hashed one.
  this.password = hash;

  // Move to the next middleware
  next();
});

// Check if admin login password is valid
// eslint-disable-next-line func-names
adminsSchema.methods.isValidPassword = async function (password) {
  const admin = this;

  const compare = await bcrypt.compare(password, admin.loginDetails.password);
  return compare;
};

module.exports = mongoose.model('admins', adminsSchema);
