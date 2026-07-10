const express  = require('express');
const products = require('./data/products');
const productRoutes = require("./routes/products")

const app = express();

app.use(express.json());

// Use every route defined inside productRoutes
app.use(productRoutes);

const PORT = 3003;

app.get('/', (req, res) => {
    res.send('Welcome to my REST API!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// stopped on the step of making routes inside a separate file and importing them into the server.js file.