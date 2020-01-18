const mongoose = require('mongoose');

const { Schema } = mongoose;

const manualSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  syntax: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
  },
  note: {
    type: String,
    required: true,
  },
  example: {
    type: String,
    required: true,
  },
  homeWork: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  moreDocument: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Overview', manualSchema);
