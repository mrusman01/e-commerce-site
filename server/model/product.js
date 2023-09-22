const mongoose = require("mongoose");

const AddProduct = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  avatar: String,
  rating: String,
  categories: String,
  quantity: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" },
});

const ProductSchema = mongoose.model("AddProduct", AddProduct);
module.exports = ProductSchema;
