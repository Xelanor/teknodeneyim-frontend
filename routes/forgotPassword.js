let User = require('../models/user');
let crypto = require('crypto')
const express = require('express');
const router = express.Router();

const mailer = require('../utils/Mailer')

router.post('/forgotPassword', (req, res, next) => {
  if (req.body.email === "") {
    res.json('email required')
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.json('email not in db')
      } else {
        const token = crypto.randomBytes(20).toString('hex')
        User.findOneAndUpdate({ email: req.body.email }, {
          $set: {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 36000
          }
        })
          .then(() => mailer.send({
            to: req.body.email,
            from: 'info@teknodeneyim.com',
            subject: 'TeknoDeneyim Şifre Sıfırlama',
            text: `Lütfen aşağıdaki şifre sıfırlama linkine tıklayın: \n\n` +
              `teknodeneyim.herokuapp.com/reset/${token}\n\n` +
              `BYE`
          })
            .then(req => res.json('recovery email sent')))
          .catch(err => res.status(400).json('Error: ' + err))
      }
    })
})

module.exports = router;
