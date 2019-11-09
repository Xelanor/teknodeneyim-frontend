const router = require("express").Router();
let Stock = require("../models/stock");

router.route("/").get((req, res) => {
  Stock.find()
    .then(req => res.json(req))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const newStock = new Stock({ name });

  newStock
    .save()
    .then(post => {
      res.json("Stock added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
