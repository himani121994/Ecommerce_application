const mongoose = require("mongoose");

const AdminLoginSchema = new mongoose.Schema({
     uname:String,
     password:String,
     role: { type: String, enum: ['admin'], default: 'admin' }
     
})
module.exports = mongoose.model("Admin",AdminLoginSchema)