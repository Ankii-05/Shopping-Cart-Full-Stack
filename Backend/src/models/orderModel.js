let mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user-schema",
        requied:true,
        unique:true,
    },
    items:[
        {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product-Schema",
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
            min:1,
        },
        }
    ],
    totalItems:{
        type:Number,
        required:true,
    },
     totalPrice:{
        type:Number,
        requied:true,
    },
    orderStatus:{
        type:String,
        enum:["pending", "confirmed","shipped", "cancelled"],
        default:"pending",
        trim:true,
    },
    paymentStatus:{
        type:String,
        enum:["pending", "success", "cancelled"],
        default:"Pending",
        trim:true,
    },
    shippingAddress:{
        type:String,
        required:true,
        trim:true,
    },
    orderAt:{
        type:Date,
        default:Date.now,
    },
},
{
    timestamps:true,
})

module.exports = new mongoose.model("order", orderSchema)