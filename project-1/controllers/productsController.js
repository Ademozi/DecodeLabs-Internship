const products = require("../data/products");

const getProducts = (req, res) => {
    res.json(products);
};

const getProductsById = (req, res) => {
    const id = parseInt(req.params.id);

    for (const product of products) {
        if (product.id === id) {
            return res.json(product);
        } 
    }

    res.status(404).json({
        message: "Product not found" 
    });
};

const addProduct = (req, res) => {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({
            message: "name, price and category are required."
        });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price,
        category
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
}

module.exports = {
    getProducts,
    getProductsById,
    addProduct
};