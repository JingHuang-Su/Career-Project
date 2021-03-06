const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  time: {
    type: String
  },
  timestamp: {
    type: String
  }
});

module.exports = Chat = mongoose.model('chat', ChatSchema);
