# 🔐 Secure Authentication System API

A secure RESTful Authentication API built with **Node.js**, **Express.js**, **MongoDB**, and **JWT** as part of the **DecodeLabs Backend Internship – Project 3**.

This project demonstrates how to securely register users, authenticate them using JSON Web Tokens (JWT), and protect API routes with middleware while following backend security best practices.

---

## 🚀 Features

- User Registration
- Secure Password Hashing with **bcrypt**
- User Login
- JWT (JSON Web Token) Authentication
- Protected Routes using Authentication Middleware
- MongoDB Database Integration
- Environment Variable Configuration with `.env`
- Secure Secret Management

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcrypt
- JSON Web Token (JWT)
- dotenv

---

## 📂 Project Structure

```
project-3/
│
├── controllers/
│   └── authController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/project-3.git
```

Go into the project folder:

```bash
cd project-3
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Start the server:

```bash
node server.js
```

---

## 📌 API Endpoints

### Register User

**POST**

```
/api/auth/register
```

Request Body

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

### Login

**POST**

```
/api/auth/login
```

Request Body

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

Response

```json
{
  "message": "Login successful",
  "token": "YOUR_JWT_TOKEN"
}
```

---

### Protected Route

**GET**

```
/api/auth/profile
```

Headers

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔒 Authentication Flow

1. User registers with an email and password.
2. The password is securely hashed using **bcrypt** before being stored.
3. The user logs in with valid credentials.
4. The server verifies the password.
5. A signed JWT is generated and returned.
6. The client includes the JWT in the `Authorization` header.
7. Authentication middleware verifies the token before allowing access to protected routes.

---

## 🛡️ Security Practices

- Passwords are never stored in plain text.
- Passwords are hashed using **bcrypt**.
- JWTs are signed with a secret key stored in `.env`.
- Protected routes require a valid Bearer Token.
- Sensitive configuration is excluded from Git using `.gitignore`.

---

## 🧪 Testing

This API can be tested using:

- Postman
- Thunder Client
- Insomnia

---

## 📚 Concepts Learned

- REST API Development
- Authentication vs Authorization
- Password Hashing
- JWT Authentication
- Express Middleware
- Environment Variables
- Secure API Design
- MongoDB Integration

---

## 🎯 Internship

This project was completed as **Project 3** of the **DecodeLabs Backend Internship**, focusing on implementing secure authentication using modern backend development practices.

---

## 📄 License

This project is intended for educational purposes as part of the DecodeLabs Backend Internship.

---
---
---

# My Notes:

# Middleware

Middleware sits between the client and the route.
```
Client

↓

Middleware

↓

Protected Route
```

The middleware should

```
Read Authorization header

↓

Does token exist?

↓

No

↓

401

------------

Yes

↓

Verify JWT

↓

Invalid?

↓

401

------------

Valid

↓

Attach user info

↓

next()
```
Think of middleware as a security guard checking IDs before allowing entry.

---

# What is JWT_SECRET?

When a user logs in, your server creates a JWT (JSON Web Token). To prevent anyone from forging or modifying this token, the server signs it using a secret key.

Think of it like this:

Your server has a private stamp (the JWT_SECRET).
Every JWT is stamped before it's sent to the client.
When the client sends the JWT back, the server checks the stamp.
If the stamp is valid, the server trusts the token.
If someone changes the token, the stamp no longer matches, and the server rejects it.

# What should you put there?

You can put any long, random, hard-to-guess string.

For example:

JWT_SECRET=Y3m7$kL9!pQ2@vNx8#RzA5wFm1^BcD6u

# Hash the password

This is the most important part.

const hashedPassword = await bcrypt.hash(password, 10);
What does 10 mean?

It is the salt rounds (also called the cost factor).

Higher number:

More secure ✅
Slower ⏳

Lower number:

Faster ⚡
Less secure ❌

For learning projects, 10 is a common choice. In production, the appropriate cost depends on your hardware and performance goals.

--- 

we don't say:

```
Email doesn't exist
```
Why?

Because hackers could use that information to discover valid email addresses.

Instead we always return:
```
Invalid email or password
```
Whether the email is wrong or the password is wrong.

This is a security best practice.

--- 

# Generate JWT

Now comes the exciting part.
```
const token = jwt.sign(
    {
        userId: user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);
```
Let's understand each part.

## Payload
```
{
    userId: user._id
}
```
This is the information stored inside the JWT.

Don't store:

password
email (unless you have a reason)
sensitive information

The user ID is enough to identify the user.

## Secret
```
process.env.JWT_SECRET
```
This is your private key from .env.

The server uses it to sign the token.

## Expiration
```
expiresIn: "1h"
```
After one hour:

The token becomes invalid.

The user must log in again (or use a refresh token in more advanced systems).

---

# What is Middleware?

Middleware is a function that runs before your route handler.

Without middleware:
```
Client
   │
   ▼
Route
```
With middleware:
```
Client
   │
   ▼
Middleware
   │
   ▼
Route
```

# Create the middleware function
```
const authMiddleware = (req, res, next) => {

};
```
Notice the third parameter:
```
next
```
This is special.

Calling:
```
next();
```
means:

"The user passed the security check. Continue to the next function."

# Extract the token

The header is:
```
Bearer eyJhbGc...
```
We only need:
```
eyJhbGc...
```
Split the string:
```
const token = authHeader.split(" ")[1];
```
Let's see how it works.

Before:
```
Bearer abc123
```
After:
```
authHeader.split(" ")
```
Result:
```
[
 "Bearer",
 "abc123"
]
```
So
```
[1]
```
is
```
abc123
```

---
---
# Test

## Step 1: Register a user

Make a POST request:

POST http://localhost:3000/api/auth/register

Body → raw → JSON
```
{
    "email": "john@gmail.com",
    "password": "123456"
}
```
Expected response:
```
{
    "message": "User registered successfully"
}
```

## Step 2: Login

Now make another request:

POST http://localhost:3000/api/auth/login

Body:
```
{
    "email": "john@gmail.com",
    "password": "123456"
}
```
You should receive something like:
```
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```
Copy the token.

It will be a very long string like:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....


## Step 3: Test WITHOUT the token

Now send:

GET http://localhost:3000/api/auth/profile

Don't add any headers.

Expected response:
```
{
    "message": "Access denied. No token provided."
}
```

That means your middleware is working because it blocked the request.

## Step 4: Test WITH the token

Now go to the Headers tab in Postman.

Add this header:
```
Key	Value
Authorization	Bearer YOUR_TOKEN
```
For example:
```
Key	Value
Authorization	Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Notice there is a space between:

Bearer

and

eyJhbGc...

It should look exactly like this:

```
Authorization: Bearer eyJhbGcOiJIUzI1NiIs...
```

Then click Send.

You should get something like:

```
{
    "message": "Welcome to your profile!",
    "user": {
        "userId": "6875..."
    }
}
```