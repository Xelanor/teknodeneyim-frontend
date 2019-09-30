const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  reported: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Comment'
  },
}, {
  timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;