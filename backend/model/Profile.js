const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProfileSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'user'
  },
  company: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: [
    {
      category: {
        type: String,
        required: true
      },
      skill: {
        type: String,
        required: true
      },
      certificated: [
        {
          user: {
            type: ObjectId,
            ref: 'user'
          }
        }
      ]
    }
  ],
  about: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        require: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      major: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  certification: [
    {
      certificationName: {
        type: String,
        required: true
      },
      getDay: {
        type: Date,
        required: true
      }
      // ,
      // description: {
      //   type: String,
      //   required: true
      // }
    }
  ],
  others: [
    {
      otherName: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    },
    medium: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
