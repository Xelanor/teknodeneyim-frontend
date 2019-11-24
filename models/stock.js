const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

const stockSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    buyTarget: {
      type: SchemaTypes.Double
    },
    sellTarget: {
      type: SchemaTypes.Double
    },
    prevBuyTarget: {
      type: SchemaTypes.Double
    },
    prevSellTarget: {
      type: SchemaTypes.Double
    }
  },
  {
    timestamps: true
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
