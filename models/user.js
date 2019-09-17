const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  description: {
    type: String,
    default: "Kısa Bir Kişisel Tanıtım"
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  saved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  role: {
    type: String,
    default: 'member'
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
}, {
  timestamps: true,
});

userSchema.methods.toggleSave = async function (postId) {
  let user = this
  let index = user.saved.findIndex(item => item.toString() === postId.toString())

  if (index === -1) {
    user.saved.push(postId)
  } else {
    user.saved.splice(index, 1)
  }

  await user.save()
  return user
}

const User = mongoose.model('User', userSchema);

module.exports = User;