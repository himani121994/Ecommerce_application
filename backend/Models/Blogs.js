const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    blogTitle:String,
    blogDescription: String,
    images: [String], 
    defaultImage: String 
});

module.exports = mongoose.model("Blogs", BlogSchema);
