const productModel = require('../models/productModel.js')
const mongoose = require('mongoose');
const {isValid, isValidURL} = require('./validator.js');
// Add Products

const addProducts = async (req, res) => {
    try {
        let productData = req.body;
        if (Object.keys(productData).length === 0) {
            return res.status(400).json({ msg: "Bad Request, No data provided" })
        }
        // Product Data Validations
        const {productImage, productName, productDescription, productCategory, price, productRating, isFreeDelivery } = productData;
        // Product Image Validation
        if(!isValid(productImage)){
            return res.status(400).json({ msg: "Product Image URL is required" })
        }
        if(!isValidURL(productImage)){
            return res.status(400).json({msg:"Please Provide correct URL"})
        }
        // Product Name Validation
        if(!isValid(productName)){
            return res.status(400).json({ msg: "Product Name is required" })
        }
        // product Description Validation
        if(!isValid(productDescription)){
            return res.status(400).json({ msg: "Product Description is required" })
        }
        // product Category Validation
        if(!isValid(productCategory)){
            return res.status(400).json({ msg: "Product Category is required" })
        }
        const validCategory= ["Electronics", "Clothes", "Food", "Books", "Furniture"];

        if(!validCategory.includes(productCategory)){
            return res.status(400).json({ msg: "Product Category is invalid " })    
        }
        // product Price validation
        if(!isValid(price)){
            return res.status(400).json({ msg: "Product Price is required" })
        }
        // product Rating Validation
        if(!isValid(productRating)){
            return res.status(400).json({ msg: "Product Rating is required" })
        }
        let min = 0;
        let max = 6;

        if (productRating <= min || productRating >= max) {
            return res.status(400).json({ msg: "Product Rating should be between 0 to 5" });
        }

        // isFreeDelivery Validation
        if (productData.hasOwnProperty(isFreeDelivery)) {
      if (typeof isFreeDelivery !== "boolean") {
        return res
          .status(400)
          .json({ msg: "isFreeDelivery must be a boolean value" });
      }
    }
        let products = await productModel.create(productData);
        return res.status(201).json({ msg: "Product Added Successfully", products })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

// Get Products
const getProducts = async (req,res) =>{
    try {
        let products = await productModel.find();
        
        if(products.length === 0){
            return res.status(404).json({msg:"Product not Found"})
        }
        return res.status(200).json({msg:"Product fetch successful",products});
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

// update Products
const updateProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        let products = req.body;

        // Product ID validation
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid Product ID" });
        }

        // Check if body is empty
        if (Object.keys(products).length === 0){
            return res.status(404).json({ msg: "Bad request, Data not Found" });
        }

        const { productImage, productName, productDescription, productCategory, productPrice, productRating, isFreeDelivery } = products;

        // Product image URL validation
        if (productImage !== undefined && !isValid(productImage)) {
            return res.status(400).json({ msg: "Product image URL is required" });
        }

        // Product name validation
        if (productName !== undefined && !isValid(productName)) {
            return res.status(400).json({ msg: "Product name is required" });
        }

        // Product description validation
        if (productDescription !== undefined && !isValid(productDescription)) {
            return res.status(400).json({ msg: "Product description is required" });
        }

        // Product category validation
        if (productCategory !== undefined) {
            if (!isValid(productCategory)) {
                return res.status(400).json({ msg: "Product category is required" });
            }
            if (!validCategory.includes(productCategory)) {
                return res.status(400).json({ msg: "Please enter a valid category" });
            }
        }

        // Product price validation
        if (productPrice !== undefined && !isValid(productPrice)) {
            return res.status(400).json({ msg: "Product price is required" });
        }

        // Product rating validation
        if (productRating !== undefined) {
            if (!isValid(productRating)) {
                return res.status(400).json({ msg: "Ratings are required" });
            }

            // Rating should be between 0 and 5 (inclusive)
            if (productRating < 0 || productRating > 5) {
                return res.status(400).json({ msg: "Product Rating should be between 0 to 5" });
            }
        }

        // Update product
        let updatedProduct = await productModel.findByIdAndUpdate(productId, products, { new: true });

        return res.status(200).json({ msg: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// delete Products
const deleteProduct = async (req,res)=>{
    try {
        let productId = req.params.id;
        let products = req.body;

        // User Id Validation
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid Product ID" });
        }

        let deletedData = await productModel.findByIdAndDelete(productId);

        if(!deletedData){
            return res.status(404).json({msg:"Product Not Found"})
        }
        return res.status(200).json({msg:"Product deleted successfully",deletedData})

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Internal server error"})
    }
}

// get products by query
const getProductsByCategory = async (req, res) => {
    try {
        const category = req.query.productCategory;

        // Basic validation
        if (!category) {
            return res.status(400).json({ msg: "Product category is required" });
        }

        const products = await productModel.find({ productCategory: category });

        if (products.length === 0) {
            return res.status(404).json({ msg: "No products found for this category" });
        }

        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// get Products by is free dilvery or not
const getProductsByFreeDeliveryOrNot = async (req, res) => {
    try {
        const category = req.query.isFreeDelivery;

        // Basic validation
        if (!category) {
            return res.status(400).json({ msg: "Product category is required" });
        }

        const products = await productModel.find({ isFreeDelivery: category });

        if (products.length === 0) {
            return res.status(404).json({ msg: "No products found for this category" });
        }

        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};


module.exports = {addProducts, getProducts, updateProduct, deleteProduct, getProductsByCategory, getProductsByFreeDeliveryOrNot}
