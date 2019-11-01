const router = require('express').Router();
let Post = require('../models/post');
let Comment = require('../models/comment');
let User = require('../models/user');
let Report = require('../models/report');

// Get all the posts for table
router.route('/posts/show').get((req, res) => {
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
      post.content = req.body.content
      post.description = req.body.description
      post.subjects = req.body.subjects
      post.save()
    })
    .then(() => {
      res.status(200).send({ message: 'password updated' })
    })
})

router.route('/posts/save/').get((req, res) => {
  Post.find()
    .then(users => users.forEach(user => user.save()))
    .then(() => {
      res.status(200).send({ message: 'password updated' })
    })
})

// Get all the comments for table
router.route('/comments/show').get((req, res) => {
  Comment.find().sort({ createdAt: 'desc' })
    .populate({
      path: "username",
      select: "role username avatar"
    })
    .populate({
      path: "target",
      select: "content"
    })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a Comment with its refrences
router.route('/comments/delete').post((req, res) => {
  Comment.findOneAndRemove({ _id: req.body._id }, (err, response) => {
    Report.deleteMany({ comment: req.body._id }, (err, res) => {
    })
    Post.updateMany({ $pull: { comments: req.body._id } }, (err, res) => {
    })
  })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;