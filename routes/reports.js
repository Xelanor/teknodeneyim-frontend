const router = require('express').Router();
const mailer = require('../utils/Mailer')
let Report = require('../models/report');
let User = require('../models/user');
const Telegram = require('../utils/Telegram')

router.route('/new-report').post((req, res) => {
  const { reporter, reported, comment } = req.body
  const newReport = new Report({ reporter, reported, comment });

  newReport.save()
    .then(() => Telegram(`Rapor geldi`))
    .catch(err => res.status(400).json('Error: ' + err));

  User.findOneAndUpdate({ _id: reporter }, {
    $set: {
      lastReported: Date.now()
    }
  })
    .then(() => res.json(''))
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;
