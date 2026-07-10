const express = require('express');
const router = express.Router(); 
const products = require("../data/products");
const { getProducts, getProductsById, addProduct } = require("../controllers/productsController");


router.get('/products', getProducts); 
router.get('/products/:id', getProductsById);
router.post("/products", addProduct);

module.exports = router;