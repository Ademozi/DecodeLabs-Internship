const express  = require('express');
const products = require('./data/products');

const app = express();

app.use(express.json());

const PORT = 3003;

app.get('/', (req, res) => {
    res.send('Welcome to my REST API!');
});

app.get('/products', (req, res) => {
    res.json(products);
}); 

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    for (const product of products) {
        if (product.id === id) {
            return res.json(product);
        } 
    }

    res.status(404).json({
        message: "Product not found" 
    });
});

app.post("/products", (req, res) => {
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
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// stopped on the step of making routes inside a separate file and importing them into the server.js file.