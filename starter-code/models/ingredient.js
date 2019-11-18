const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema(
  {
    name: String,
    calories: Number,
    price: Number
  },
  {
    timestamps: true
  }
);

const Model = mongoose.model("Ingredient", schemaName);
module.exports = Model;
