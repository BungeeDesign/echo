const mongoose = require('mongoose');

const { Schema } = mongoose;

const hubsSchema = new Schema({
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
  stats: {
    airQuality: {
      type: Number,
      required: true,
    },
    waterLevel: {
      type: Number,
      required: true,
    },
    battery: {
      type: Number,
      required: true,
    },
    videoFeed: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model('hubs', hubsSchema);
