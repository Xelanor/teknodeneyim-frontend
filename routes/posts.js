const router = require('express').Router();
let Post = require('../models/post');

// Get oll posts in descending order with X limit
router.route('/').get((req, res) => {
  Post.find()
    .sort({ createdAt: 'desc' })
    .limit(10)
    .populate({
      path: 'username',
      select: 'username' // Just get the username field
    })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get X posts in descending order for Hompage with Y comments
router.route('/homepage').get((req, res) => {
  Post.find()
    .sort({ createdAt: 'desc' })
    .limit(10)
    .populate({
      path: 'username',
      select: 'username' // Just get the username field
    })
    .populate({
      path: "comments",
      options: { sort: '-createdAt', limit: 3 },
      populate: {
        path: "username",
        select: 'username' // Just get the username field
      }
    })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get X posts in descending order for Hompage with Y comments
router.route('/search/:content').get((req, res) => {
  var nameRegex = new RegExp(req.params.content.toLowerCase(), 'i')
  Post.find({ $or: [{ "content": nameRegex }, { "subject": nameRegex }] })
    .sort({ createdAt: 'desc' })
    .limit(10)
    .populate({
      path: 'username',
      select: 'username' // Just get the username field
    })
    .populate({
      path: "comments",
      options: { sort: '-createdAt', limit: 3 },
      populate: {
        path: "username",
        select: 'username' // Just get the username field
      }
    })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add new post 
// params: username and content
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const content = req.body.content;
  const newPost = new Post({ username, content });

  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a spesific post with populate
router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .populate({
      path: 'username',
      select: 'username' // Just get the username field
    })
    .populate({
      path: "comments",
      options: { sort: '-createdAt' },
      populate: {
        path: "username",
        select: 'username' // Just get the username field
      }
    })
    .exec()
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add comment to a Post
router.route('/add-comment-to-post').post((req, res) => {
  Post.findByIdAndUpdate(req.body.id, { $push: { comments: req.body.comment } })
    .then(() => res.json('Comment added to Post!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;
