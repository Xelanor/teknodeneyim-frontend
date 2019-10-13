const router = require('express').Router();
let Post = require('../models/post');
let Comment = require('../models/comment');
let User = require('../models/user');

// Get all the posts for table
router.route('/posts').get((req, res) => {
  Post.find().sort({ createdAt: 'desc' })
    .populate({
      path: "username",
      select: "role username avatar"
    })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a Post with its refrences
router.route('/posts/delete').post((req, res) => {
  Post.findOneAndRemove({ _id: req.body._id }, (err, response) => {
    Comment.deleteMany({ target: req.body._id }, (err, res) => {
    })
    User.updateMany({ $pull: { saved: req.body._id, posts: req.body._id } }, (err, res) => {
    })
  })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/posts/edit/').post((req, res) => {
  Post.findOne({ _id: req.body.postId })
    .then(post => {
      post.update({
        content: req.body.content,
        description: req.body.description,
        subjects: req.body.subjects
      })
        .then(() => {
          res.status(200).send({ message: 'password updated' })
        })
    })
})

module.exports = router;