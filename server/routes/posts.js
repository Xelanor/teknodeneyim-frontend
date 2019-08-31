const router = require('express').Router();
let Post = require('../models/post');

router.route('/').get((req, res) => {
  Post.find().sort({ createdAt: 'desc' }).limit(10)
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const content = req.body.content;
  const newPost = new Post({ username, content });

  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .populate("username")
    .populate({
      path: "comments",
      options: { sort: '-createdAt' },
      populate: {
        path: "username",
      }
    })
    .exec()
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add-comment-to-post').post((req, res) => {
  Post.findByIdAndUpdate(req.body.id, { $push: { comments: req.body.comment } })
    .then(() => res.json('Comment added to Post!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;
