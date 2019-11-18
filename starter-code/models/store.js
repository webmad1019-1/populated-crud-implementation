const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema(
  {
    name: String,
    city: String,
    pizzas: [{ type: Schema.Types.ObjectId, ref: "pizzas" }]
  },
  {
    timestamps: true
  }
);

const Model = mongoose.model("Store", schemaName);
module.exports = Model;
