const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: String,
  price: String,
  description: String,
  size: String,
});

module.exports = mongoose.model("item", ItemSchema);
