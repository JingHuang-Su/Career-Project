const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean
  },
  friends: [
    {
      friendData: {
        id: {
          type: ObjectId,
          required: true,
          ref: 'user'
        },
        name: {
          type: String,
          required: true
        },
        avatar: {
          type: String,
          required: true
        }
      },
      hasbeenmsg:{
        type:Boolean,
        default:false
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  pendingfriends: [
    {
      pendingData: {
        id: {
          type: ObjectId,
          required: true,
          ref: 'user'
        },
        name: {
          type: String,
          required: true
        },
        avatar: {
          type: String,
          required: true
        }
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = User = mongoose.model('user', UserSchema);
