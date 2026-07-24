# Third party API
### The Third Party API we will use is:
OpenWeatherMap

---
# Why Axios?

DecodeLabs said:
Using Axios is recommended because it provides automatic JSON parsing, built-in timeout properties, and better error handling.
Instead of using the built-in fetch(), we'll use Axios.

---
# What is Graceful Degradation?

Imagine this scenario.

10:00 AM

The user requests:

```
GET /weather/London
```

OpenWeatherMap is working.

We receive:

```
{
    "city":"London",
    "temperature":19,
    "humidity":74
}
```

Great.

10:05 AM

The Weather API suddenly crashes.

Normally your server returns

```
{
    "success":false,
    "message":"Weather service unavailable"
}
```

Not terrible...

But we can do better.

Instead, we can return the last successful result.

```
{
    "success":true,
    "cached":true,
    "data":{
        "city":"London",
        "temperature":19,
        "humidity":74
    }
}
```

The user still gets weather information.

It might be 5 minutes old...

But that's much better than nothing.

This is called Graceful Degradation.

Large companies like Google, Netflix, and Amazon use caching extensively.

## One important note

This cache is in-memory. That means:

If you stop the server, the cache is lost.
If the application restarts, the cache starts empty.
If you run multiple server instances, each has its own separate cache.

For a learning project like DecodeLabs, this is perfectly acceptable and demonstrates the concept of graceful degradation. In production, you would typically use a shared cache like Redis, which survives across requests and can be shared by multiple server instances.