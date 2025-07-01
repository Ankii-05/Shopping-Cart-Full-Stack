const express = require('express');

const router = express.Router();

// middleWare 
const authMidlleware = require('../middleware/authMiddleware.js');

// USER Controller Routes
const {addUsers, getUsers, updateUser, deleteUser, loginUser} = require('../controller/userControlller.js');

router.post('/addUsers', addUsers);
router.get('/getUsers',authMidlleware, getUsers);
router.put('/updateUser/:id',authMidlleware, updateUser)
router.delete('/deleteUser/:id',authMidlleware, deleteUser);

// User Login
router.post('/login',loginUser);


// PRODUCT Controller Routes
const {addProducts, getProducts, updateProduct, deleteProduct, getProductsByCategory, getProductsByFreeDeliveryOrNot} = require('../controller/productController.js')

router.post('/addProducts',authMidlleware, addProducts);
router.get('/getProducts',getProducts);
router.put('/updateProduct/:id',authMidlleware, updateProduct);
router.delete('/deleteProduct/:id',authMidlleware, deleteProduct);
router.get('/getProductsByCategory', getProductsByCategory );
router.get('/getProductsByDelivery', getProductsByFreeDeliveryOrNot);



// Cart Model
const {addToCart, getCart, clearCart,updateCart, removeItemFromcart} = require('../controller/cartController.js')
router.post('/addToCart', authMidlleware, addToCart);
router.get('/getCart', authMidlleware, getCart);
router.delete('/clearCart', authMidlleware, clearCart);
router.put('/updateCart',authMidlleware,updateCart);
router.delete('/removeCart/:productId',authMidlleware,removeItemFromcart);

// Order Model
const {placeOrder, getMyOrder, cancelOrder} = require('../controller/orderController.js')
router.post('/placeOrder', authMidlleware, placeOrder)
router.get('/getMyOrder',authMidlleware,getMyOrder)
router.delete('/cancelOrder/:id',authMidlleware, cancelOrder)

module.exports = router;