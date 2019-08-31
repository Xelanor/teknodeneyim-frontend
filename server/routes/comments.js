const router = require('express').Router();
let Comment = require('../models/comment');

router.route('/').get((req, res) => {
  Comment.find().sort({ createdAt: 'desc' })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const content = req.body.content;
  const target = req.body.target;
  const newComment = new Comment({ username, content, target });

  newComment.save()
    .then(comment => res.json(comment._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
