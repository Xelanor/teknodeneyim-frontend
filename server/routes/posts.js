const router = require('express').Router();
let Post = require('../models/post');

router.route('/').get((req, res) => {
  Post.find().sort({ createdAt: 'desc' }).limit(10)
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const author = req.body.author;
  const content = req.body.content;
  const newPost = new Post({ author, content });

  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
