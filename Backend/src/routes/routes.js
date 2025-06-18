const express = require('express');

const router = express.Router();


// USER Controller Routes
const {addUsers, getUsers, updateUser, deleteUser, loginUser} = require('../controller/userControlller.js');

router.post('/addUsers', addUsers);
router.get('/getUsers', getUsers);
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

// User Login
router.post('/login',loginUser);


// PRODUCT Controller Routes
const {addProducts, getProducts, updateProduct, deleteProduct, getProductsByCategory, getProductsByFreeDeliveryOrNot} = require('../controller/productController.js')

router.post('/addProducts', addProducts);
router.get('/getProducts',getProducts);
router.put('/updateProduct/:id',updateProduct);
router.delete('/deleteProduct/:id',deleteProduct);
router.get('/getProductsByCategory', getProductsByCategory );
router.get('/getProductsByDelivery', getProductsByFreeDeliveryOrNot);




module.exports = router;