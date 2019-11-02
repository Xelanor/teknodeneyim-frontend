const router = require('express').Router();
let Post = require('../models/post');

// Get oll posts in descending order with X limit
router.route('/').get((req, res) => {
  Post.find()
    .sort({ createdAt: 'desc' })
    .limit(10)
    .populate({
      path: 'username',
      select: 'username avatar' // Just get the username field
    })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get X posts in descending order for Hompage with Y comments
router.route('/homepage').get((req, res) => {
  Post.find({ state: "active" })
    .sort({ updatedAt: 'desc' })
    .limit(10)
    .populate({
      path: 'username',
      select: 'username avatar' // Just get the username field
    })
    .populate({
      path: "comments",
      options: { sort: '-createdAt', limit: 2 },
      populate: {
        path: "username",
        select: 'username avatar' // Just get the username field
      }
    })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get X posts with highest comments for sidebar
router.route('/sidebar-posts').get((req, res) => {
  Post.aggregate([
    { $match: { state: "active" } },
    {
      $project: {
        content: 1,
        slug: 1,
        commentsize: { $size: "$comments" }
      }
    },
    { $sort: { commentsize: -1 } },
    { $limit: 10 }
  ])
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Get X posts in descending order for Hompage with Y comments
router.route('/search/').post((req, res) => {
  let content = req.body.content.trim()
  if (content.length > 0) {
    var nameRegex = new RegExp(req.body.content.toLowerCase(), 'i')
    Post.find({ $and: [{ state: "active" }, { $or: [{ "content": nameRegex }, { "description": nameRegex }, { "subjects": nameRegex }] }] })
      .sort({ createdAt: 'desc' })
      .limit(10)
      .populate({
        path: 'username',
        select: 'username avatar' // Just get the username field
      })
      .populate({
        path: "comments",
        options: { sort: '-createdAt', limit: 3 },
        populate: {
          path: "username",
          select: 'username avatar' // Just get the username field
        }
      })
      .then(req => res.json(req))
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    return res.json([])
  }
});

// Get X posts in descending order for Hompage with Y comments
router.route('/autocomplete').post((req, res) => {
  let content = req.body.content.trim()
  if (content.length > 0) {
    var nameRegex = new RegExp(content.toLowerCase(), 'i')
    Post.aggregate([
      { $match: { $and: [{ state: "active" }, { $or: [{ "content": nameRegex }, { "description": nameRegex }, { "subjects": nameRegex }] }] } },
      {
        $project: {
          content: 1,
          slug: 1,
          commentsize: { $size: "$comments" }
        }
      },
      { $sort: { commentsize: -1 } }
    ])
      .limit(7)
      .then(req => res.json(req))
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    return res.json([])
  }
});

// Add new post 
// params: username and content
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const content = req.body.content;
  const description = req.body.description;
  const subjects = req.body.subjects;
  const state = req.body.state;
  const newPost = new Post({ username, content, description, subjects, state });

  newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a spesific post with populate
router.route('/:slug').get((req, res) => {
  Post.findOne({ slug: req.params.slug, state: "active" })
    .populate({
      path: 'username',
      select: 'username avatar' // Just get the username field
    })
    .populate({
      path: "comments",
      options: { sort: '-createdAt' },
      populate: {
        path: "username",
        select: 'username avatar' // Just get the username field
      }
    })
    .exec()
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a spesific post with populate
router.route('/post/:id').get((req, res) => {
  Post.findOne({ _id: req.params.id, state: "active" })
    .populate({
      path: 'username',
      select: 'username avatar' // Just get the username field
    })
    .populate({
      path: "comments",
      options: { sort: '-createdAt' },
      populate: {
        path: "username",
        select: 'username avatar' // Just get the username field
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

// Save or unsave Post
router.post('/:id/save', async (req, res) => {
  try {
    let post = await Post.findById(req.params.id)
      .catch(e => {
        throw new Error('No post')
      })

    if (!post) {
      throw new Error('No post')
    }
    if (!req.body.userId) {
      throw new Error('No post')
    }
    await post.toggleSave(req.body.userId)
    res.json({
      result: true,
      saved: post.saved
    })
  } catch (e) {
    let errMsgArray = []
    let errMsg = ''
    if (e.errors) {
      Object.keys(e.errors).forEach(key => {
        errMsgArray.push(e.errors[key].message)
      })

      errMsg = errMsgArray.join(', ')
    }

    if (e.message) {
      !!errMsg && (errMsg += ', ')
      errMsg += e.message
    }

    !errMsg && (errMsg = 'Error')

    res.json({
      result: false,
      errMsg,
      err: e
    })
  }
});

router.post('/delete-comment', async (req, res) => {
  await Post.findOneAndUpdate({ slug: req.body.postId }, { $pullAll: { comments: [req.body.comment] } })
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
