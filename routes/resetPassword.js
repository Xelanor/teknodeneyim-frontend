let User = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/reset', (req, res, next) => {
  User.findOne({ resetPasswordToken: req.query.resetPasswordToken })
    .then(user => {
      if (!user) {
        res.json('password reset link is invalid or has expired')
      } else {
        res.status(200).send({
          username: user.username,
          message: 'password reset link a-ok'
        })
      }
    })
})

module.exports = router;
