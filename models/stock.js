const mongoose = require("mongoose");
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

const stockSchema = new Schema(
  {
    name: {
      type: String
    },
    target: {
      type: SchemaTypes.Double
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
