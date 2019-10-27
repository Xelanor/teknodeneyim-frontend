const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema = new Schema({
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
  description: {
    type: String
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  saved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  subjects: [String]
}, {
  timestamps: true,
});

postSchema.methods.toggleSave = async function (userId) {
  let post = this
  let index = post.saved.findIndex(item => item.toString() === userId.toString())

  if (index === -1) {
    post.saved.push(userId)
  } else {
    post.saved.splice(index, 1)
  }

  await post.save()
  return post
}

const Post = mongoose.model('Post', postSchema);

module.exports = Post;