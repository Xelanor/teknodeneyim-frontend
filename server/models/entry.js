const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  content: {
    type: String,
    required: true
  }
}, {
    timestamps: true,
  });

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;