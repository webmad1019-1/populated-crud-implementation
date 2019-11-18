const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema({
  name: String,
  calories: Number,
  price: Number
});

const Model = mongoose.model("Ingredients", schemaName);
module.exports = Model;
