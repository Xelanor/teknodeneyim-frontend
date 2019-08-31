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
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
