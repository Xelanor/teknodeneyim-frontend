let User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.put('/updatePasswordViaEmail', (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      console.log("OK")
      if (user !== null) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            user.update({
              password: hash,
              resetPasswordToken: null,
              resetPasswordExpires: null
            })
              .then(() => {
                res.status(200).send({ message: 'password updated' })
              })
          })
        })
      } else {
        res.status(404).json('no user exists in db to update')
      }
    })
})

module.exports = router;
