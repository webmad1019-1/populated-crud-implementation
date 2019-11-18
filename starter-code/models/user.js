const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema(
  {
    name: String,
    orders: [{ type: Schema.Types.ObjectId, ref: "orders" }]
  },
  {
    timestamps: true
  }
);

const Model = mongoose.model("User", schemaName);
module.exports = Model;
