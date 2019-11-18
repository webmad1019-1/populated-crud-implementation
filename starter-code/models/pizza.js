const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema({
  name: String,
  ingredients: [{ type: Schema.Types.ObjectId, ref: "ingredients" }]
});

const Model = mongoose.model("Pizza", schemaName);
module.exports = Model;
