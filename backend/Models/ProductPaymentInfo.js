const mongoose= require("mongoose");

const PaymentSchema=new mongoose.Schema({

     name:String,
     address:String,
     mobile:String,
     pincode:String,
     productitems:String,
     totalproductprice:Number,
     dop:Date
});


module.exports= new  mongoose.model("paymentinfo", PaymentSchema);