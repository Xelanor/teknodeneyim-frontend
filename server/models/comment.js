const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {
    timestamps: true,
  });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;