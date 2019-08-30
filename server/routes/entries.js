const router = require('express').Router();
let Entry = require('../models/entry');

router.route('/').get((req, res) => {
  Entry.find()
    .then(req => res.json(req))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const content = req.body.content;
  const newEntry = new Entry({ username, content });

  newEntry.save()
    .then(() => res.json('Entry added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;