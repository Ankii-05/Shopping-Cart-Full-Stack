const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel')
const mongoose = require('mongoose');
const {isValid} = require('./validator.js')

// Place Order
const placeOrder = async (req,res)=>{
    try {
    let userId = req.user.userId;
    
    let cart = await cartModel.findOne({userId}).populate("items.productId", "productName price")
    if(!cart || cart.items.length===0){
        return res.status(404).json({msg:"Cart is Empty"})
    }

    const {totalItems, totalPrice, items, } = cart;
    
    // shipping Address validation
    let {shippingAddress} = req.body
    if(!isValid(shippingAddress)){
        return res.status(400).json({msg:"Shipping Address is required"})
    }

    const orderData = {
        userId,
        items:cart.items.map((item)=> ({
            productId:item.productId,
            quantity:item.quantity,
        })),
        totalItems,
        totalPrice,
        shippingAddress,
    }

    let order = await orderModel.create(orderData);
    cart.items = [];
    cart.totalItems=0;
    cart.totalPrice=0;

    await cart.save();

    return res.status(201).json({msg:"Order Placed Successfully",order})



    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Internal server error",error})
    }
}
// get Order
const getMyOrder = async(req,res)=>{
    try {
        let userId = req.user.userId;
        let orders = await orderModel.find({userId}).populate("items.productId" , "productName productImage quantity price ")
    if(orders.length === 0){
        return res.status(404).json("Order not found")
    }

    return res.status(200).json({msg:"Your Orders: ", orders})
    } catch (error) {
      console.log(error);
        return res.status(500).json({msg:"Internal server error",error})  
    }
}


// cancel order
const cancelOrder = async (req,res) =>{
    try {
        let userId = req.user.userId;
        let orderId = req.params.id;

        // order Id Validation
        if(!isValid(orderId) || !mongoose.Types.ObjectId.isValid(orderId)){
            return res.status(400).json({msg:"Valid Order id is required"})
        }

        let order = await orderModel.findOne({_id:orderId, userId})
        if(!order){
            return res.status(404).json({msg:"Order not found"})
        }

        if(order.orderStatus !== "pending"){
            return res.status(400).json({msg:"Only pending orders can be Cancelled"});
        }

        order.orderStatus== "cancelled"
        return res.status(200).json({msg:"Order Cancelled successful", order})

    } catch (error) {
     console.log(error);
        return res.status(500).json({msg:"Internal server error",error})    
    }
}
module.exports = {placeOrder , getMyOrder, cancelOrder}