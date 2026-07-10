# REST API Fundamentals

A simple RESTful API built with **Node.js** and **Express.js** as part of the **DecodeLabs Backend Internship**.

## 📌 Project Overview

This project demonstrates the fundamentals of building a stateless REST API. It provides endpoints to retrieve and create products while following REST principles and using proper HTTP status codes.

## 🚀 Features

* Express.js web server
* RESTful API design
* GET and POST endpoints
* JSON request and response handling
* Request body parsing
* Basic input validation
* Appropriate HTTP status codes
* Stateless architecture

## 🛠️ Technologies Used

* Node.js
* Express.js
* JavaScript

## 📁 Project Structure

```text
rest-api-fundamentals/
│
├── server.js
├── package.json
├── package-lock.json
│
├── data/
│   └── products.js
│
├── routes/
│   └── products.js
│
└── controllers/
    └── productsController.js
```

> **Note:** Depending on your progress, your project structure may still be evolving. The final goal is to separate routes, controllers, and data into their own files.

## ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd rest-api-fundamentals
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Or run with Node.js:

```bash
npm start
```

The server will start on:

```text
http://localhost:3003
```

---

# API Endpoints

## Welcome

### Request

```http
GET /
```

### Response

```json
{
  "message": "Welcome to my REST API!"
}
```

Status Code:

```
200 OK
```

---

## Get All Products

### Request

```http
GET /products
```

### Response

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 1200,
    "category": "Electronics"
  },
  {
    "id": 2,
    "name": "Keyboard",
    "price": 50,
    "category": "Accessories"
  }
]
```

Status Code:

```
200 OK
```

---

## Get Product by ID

### Request

```http
GET /products/:id
```

Example:

```http
GET /products/1
```

### Success Response

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 1200,
  "category": "Electronics"
}
```

Status Code:

```
200 OK
```

### Error Response

```json
{
  "message": "Product not found"
}
```

Status Code:

```
404 Not Found
```

---

## Create a Product

### Request

```http
POST /products
```

Request Body:

```json
{
  "name": "Monitor",
  "price": 300,
  "category": "Electronics"
}
```

### Success Response

```json
{
  "id": 4,
  "name": "Monitor",
  "price": 300,
  "category": "Electronics"
}
```

Status Code:

```
201 Created
```

### Invalid Request Example

```json
{
  "name": "Monitor"
}
```

### Error Response

```json
{
  "message": "Name, price and category are required."
}
```

Status Code:

```
400 Bad Request
```

---

# HTTP Status Codes Used

| Status Code | Description                    |
| ----------- | ------------------------------ |
| 200         | Request completed successfully |
| 201         | Resource created successfully  |
| 400         | Invalid request data           |
| 404         | Resource not found             |

---

# REST Principles Applied

* Stateless server architecture
* Resource-based URLs
* JSON request and response format
* Proper use of HTTP methods
* Standard HTTP status codes

---

# Future Improvements

* Add PUT endpoint to update products
* Add DELETE endpoint to remove products
* Connect to MongoDB
* Add input validation middleware
* Implement error handling middleware
* Add environment variables using `.env`
* Add automated testing

---

## Author

Developed as part of the **DecodeLabs Backend Internship** using **Node.js** and **Express.js**.
