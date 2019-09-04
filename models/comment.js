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
  target: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {
    timestamps: true,
  });

commentSchema.methods.toggleLike = async function (userId) {
  let comment = this
  let index = comment.likes.findIndex(item => item.toString() === userId.toString())

  if (index === -1) {
    comment.likes.push(userId)
  } else {
    comment.likes.splice(index, 1)
  }

  await comment.save()
  return comment
}

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;