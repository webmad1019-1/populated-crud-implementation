const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customers" },
  store: { type: Schema.Types.ObjectId, ref: "Stores" },
  pizzas: [{ type: Schema.Types.ObjectId, ref: "Pizzas" }]
});

const Model = mongoose.model("Orders", schemaName);
module.exports = Model;
