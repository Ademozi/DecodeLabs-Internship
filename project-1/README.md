# The Architecture:
projects-1/

│
├── server.js
│
├── routes/
│     products.js
│
├── controllers/
│     productsController.js
│
└── data/
      products.js

Each folder has one responsibility.

# What is a Route?

A route's job is not to process data.

A route only answers:

"When this URL is requested, which function should run?"

# What is a Controller?

A controller contains the business logic.

It answers questions like:

How do I get all products?
How do I find a product by ID?
How do I create a product?

The router shouldn't know any of that.

# This is called Separation of Concerns

Each file has one responsibility.

### server.js
* Configure Express
* Register middleware
* Register routers

### routes/products.js
* Match URLs
* Call controller functions

### controllers/productsController.js
* Process requests
* Validate data
* Return responses

### data/products.js
* Store data (for now)