const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothSchema = new Schema({
  title: String,
  price: String,
  description: String,
  size: String,
});

module.exports = mongoose.model("cloth", clothSchema);
