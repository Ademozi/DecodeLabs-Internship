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