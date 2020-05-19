const mongoose = require('mongoose');

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

module.exports = mongoose.model('admins', adminsSchema);
