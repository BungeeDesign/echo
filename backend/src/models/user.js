const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  userDetails: {
    name: {
      type: String,
      required: true,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      long: {
        type: Number,
        required: true,
      },
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enmum: ['Male', 'Female'],
      default: 'Male',
    },
    pregnant: {
      type: Boolean,
      default: false,
    },
    adultsWith: {
      type: Number,
      required: true,
    },
    minorsWith: {
      type: Number,
      required: true,
    },
  },
  stats: {
    food: {
      type: String,
      enmum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    health: {
      complications: {
        type: Array,
        required: true,
      },
    },
    shelter: {
      type: Boolean,
      default: false,
    },
    trapped: {
      type: Boolean,
      default: false,
    },
  },
  sos: {
    active: {
      type: Boolean,
      default: 'false',
    },
    message: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model('users', usersSchema);
