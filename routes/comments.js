const router = require('express').Router();
let Comment = require('../models/comment');
let User = require('../models/user');
let Post = require('../models/post');

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
    .then(comment => {
      User.findByIdAndUpdate(username, {
        $set: {
          lastCommented: Date.now()
        },
        $push: {
          comments: comment._id
        }
      })
      .catch(err => console.log(err))
      res.json(comment._id)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete comment
router.post('/delete', (req, res) => {
  Comment.findByIdAndDelete(req.body.comment)
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));

  User.findOneAndUpdate({ _id: req.body.reporter }, {
    $set: {
      lastCommentDeleted: Date.now()
    }, 
    $pull: {
      comments: req.body.comment
    }
  })
    .catch(err => res.status(400).json('Error: ' + err))
    
  Post.findOneAndUpdate({slug: req.body.postId}, {
    $pull: {
      comments: req.body.comment
    }
  })
  .catch(err => res.status(400).json('Error: ' + err))
});

// like or unlike comment
router.post('/:id/like', async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id)
      .catch(e => {
        throw new Error('No comment')
      })

    if (!comment) {
      throw new Error('No comment')
    }
    if (!req.body.userId) {
      throw new Error('No comment')
    }
    await comment.toggleLike(req.body.userId)
    res.json({
      result: true,
      likes: comment.likes
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

module.exports = router;
