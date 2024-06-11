const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    description: String,
    category: String,
    tags: String,
    images: [String], 
    defaultImage: String 
});

module.exports = mongoose.model("Product", ProductSchema);
