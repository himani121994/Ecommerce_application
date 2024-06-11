const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
   firstname:String,
   lastname:String,
   username:String,
   mobile:Number,
   email:String,
   password:String,
   role: { type: String, enum: ['user'], default: 'user' }
})
module.exports = mongoose.model("user",UserSchema)