const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema(
  {
    store: [{ type: Schema.Types.ObjectId, ref: "stores" }],
    pizzas: [{ type: Schema.Types.ObjectId, ref: "pizzas" }]
  },
  {
    timestamps: true
  }
);

const Model = mongoose.model("Order", schemaName);
module.exports = Model;
