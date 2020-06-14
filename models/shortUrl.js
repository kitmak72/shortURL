const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  userID: {
    type: String,
    default: 'guest',
  },

  urlCode: {
    type: String,
    unique: true,
  },

  origin: {
    type: String,
    required: true,
  },

  short: String,

  clicks: {
    type: Number,
    default: 0,
  },

  meta: [
    {
      region: String,
      platform: String,
      accessedAt: Date,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('shortUrl', shortUrlSchema);
