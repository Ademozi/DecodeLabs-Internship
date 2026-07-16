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