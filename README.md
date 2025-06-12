<!-- # Shopping-Cart-Full-Stack -->


models --- 
userModel
productModel
CartModel
OrderModel

controller--
userController
productController
CartController
OrderController

work done -- 09/06/2025
userController --
AddUsers
GetUsers
UpdateUsers
DeleteUsers


Product Model --

Product Image
Product Name
Product Descrtiption
Product Category
Product Price
Product Rating
is Free Delivery

Product Controller 
Add Product
Get All Product
Get Product by Id
Get Product by Query (ratings, isFreeDelivery, category, price)
Update Products By Id
Delete Products By Id

<!-- const productModel = require('../models/productModel'); // adjust path as needed

const getProductsByRating = async (req, res) => {
    try {
        const rating = req.query.rating;

        // Validate rating
        if (!rating || isNaN(rating)) {
            return res.status(400).json({ msg: "Rating must be a number" });
        }

        const numericRating = Number(rating);

        // Find products with rating >= given value
        const products = await productModel.find({ rating: { $gte: numericRating } });

        if (products.length === 0) {
            return res.status(404).json({ msg: "No products found with this rating or higher" });
        }

        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { getProductsByRating }; -->
