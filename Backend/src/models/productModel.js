let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    productImage:{
        type:String,
        required:true,
        trim:true,
    },
    productName:{
        type:String,
        required:true,
        trim:true,
    },
    productDescription:{
        type:String,
        required:true,
        trim:true,
    },
    productCategory:{
        type:String,
        required:true,
        enum:["Electronics", "Clothes", "Food", "Books", "Furniture"],
    },
    price:{
        type:Number,
        required:true,
    },
    productRating:{
        type:Number,
        required:true,
    },
    isFreeDelivery:{
        type:Boolean,
        default:true,
    },
}, 
{
    timestamps:true,
})

module.exports = new mongoose.model("product-Schema", productSchema);