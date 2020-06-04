const mongoose = require('mongoose');

const { Schema } = mongoose;

const messagesSchema = new Schema({
  messageRoom: {
    type: Array,
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('messages', messagesSchema);
