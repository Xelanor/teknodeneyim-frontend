const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    name: {
      type: String
    },
    target: {
      type: Number
    },
    condition: {
      type: String
    },
    state: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
