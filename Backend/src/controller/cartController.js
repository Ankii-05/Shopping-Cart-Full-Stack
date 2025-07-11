const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const { isValid } = require("./validator.js");
const mongoose = require("mongoose");

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    let { productId, quantity } = req.body;

    quantity = Number(quantity);
    if (!quantity || !Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ msg: "Valid integer quantity ≥ 1 is required." });
    }

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Valid productId is required." });
    }

    const product = await productModel.findById(productId).select("price");
    if (!product) {
      return res.status(404).json({ msg: "Product not found." });
    }

    console.log("price is here",product)

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [{ productId, quantity }],
        totalItems: 1,
        totalPrice: product.price * quantity,
      });
    } else {
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      cart.totalItems = cart.items.length;

      const populated = await cart.populate("items.productId", "price");
      cart.totalPrice = populated.items.reduce((sum, { productId: prod, quantity: qty }) => {
  if (!prod) return sum; // skip null product
  return sum + prod.price * qty;
}, 0);

    }

    await cart.save();
    return res.status(200).json({ msg: "Item added to cart", cart });
  } catch (err) {
    console.error("addToCart error:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


// Get Cart
const getCart = async (req, res) => {
  try {
    let userId = req.user.userId;

    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId", "productImage productName price");

    if (!cart) {
      return res.status(404).json({ msg: "Cart Not Found" });
    }

    return res.status(200).json({ msg: "Cart Fetched Successfully", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Update Cart
const updateCart = async (req, res) => {
  try {
    let userId = req.user.userId;
    let { productId, quantity } = req.body;

    // productId Validation
    if (!isValid(productId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Valid ProductId is Required" });
    }

    // Quantity Validation
    if (
      !isValid(quantity) ||
      typeof quantity !== "number" ||
      quantity < 1 ||
      !Number.isInteger(quantity)
    ) {
      return res.status(400).json({ msg: "Valid Quantity is Required" });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart Not Found" });
    }

    let index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index === -1) {
      return res.status(404).json({ msg: "Product Not Found in Cart" });
    }

    if (quantity === 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = quantity;
    }

    cart.totalItems = cart.items.length;

    let populated = await cart.populate("items.productId", "price");

    cart.totalPrice = populated.items.reduce((sum, item) => {
      if (item.productId) {
        return sum + item.productId.price * item.quantity;
      } else {
        return sum;
      }
    }, 0);

    await cart.save();
    return res.status(200).json({ msg: "Cart Updated", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Remove Items From Cart
const removeItemFromcart = async (req, res) => {
  try {
    let userId = req.user.userId;

    let { productId } = req.params;

    // productId Validation
    if (!isValid(productId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Valid ProductId is Required" });
    }

    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ msg: "Cart Not Found" });
    }

    let productExists = cart.items.some(
      (item) => item.productId.toString() === productId
    );

    if (!productExists) {
      return res.status(404).json({ msg: "Product Not Found In Cart" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.totalItems = cart.items.length;

    let populated = await cart.populate("items.productId", "price");

    cart.totalPrice = populated.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    await cart.save();
    return res
      .status(200)
      .json({ msg: "Product Removed From Cart Successfully", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Clear Cart
const clearCart = async (req, res) => {
  try {
    let userId = req.user.userId;

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart Not Found" });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();
    return res.status(200).json({ msg: "Cart Cleared Successfully", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeItemFromcart,
  clearCart,
};
