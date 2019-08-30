const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
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
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
    timestamps: true,
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;