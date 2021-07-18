const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  nameItem: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  popular: {
    type: Boolean,
    required: true,
  },
  selling: {
    type: Boolean,
    required: true,
  },
  sex: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
});

const Item = mongoose.model("items", itemSchema);
module.exports = Item;
