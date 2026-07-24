# 🌤️ Project 4 – Third-Party API Integration

> A Node.js and Express REST API that securely integrates with the OpenWeatherMap API, processes external weather data, and exposes a clean, user-friendly endpoint.

This project was completed as part of the **DecodeLabs Backend Internship**. It demonstrates how a backend service acts as a secure middleman between clients and third-party APIs by protecting API keys, handling asynchronous requests, transforming external data, and gracefully handling failures.

---

## 🚀 Features

- 🔐 Secure API key management using `.env`
- 🌐 Integration with the OpenWeatherMap API
- ⚡ Asynchronous HTTP requests using Axios
- 🧹 Clean and simplified JSON responses
- ⏱️ Request timeout protection
- 🛡️ Robust error handling with `try/catch`
- 💾 In-memory caching for graceful degradation
- 📦 RESTful API design

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Axios
- Dotenv
- OpenWeatherMap API

---

## 📂 Project Structure

```text
project-4/
│
├── controllers/
│   └── weatherController.js
│
├── routes/
│   └── weatherRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/project-4.git
```

### 2. Navigate to the project

```bash
cd project-4
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

```env
PORT=3000
WEATHER_API_KEY=YOUR_API_KEY
```

---

## ▶️ Run the application

```bash
node server.js
```

or

```bash
npm start
```

The server will start on:

```text
http://localhost:3000
```

---

## 📡 API Endpoint

### Get Weather by City

```http
GET /weather/:city
```

Example:

```http
GET /weather/London
```

---

## ✅ Successful Response

```json
{
  "success": true,
  "data": {
    "city": "London",
    "country": "GB",
    "temperature": 18.3,
    "feelsLike": 17.9,
    "humidity": 73,
    "weather": "Clouds",
    "description": "overcast clouds",
    "windSpeed": 4.5
  }
}
```

---

## ❌ City Not Found

Status Code:

```text
404 Not Found
```

Response:

```json
{
  "success": false,
  "message": "City not found."
}
```

---

## ⏱️ Timeout

Status Code:

```text
504 Gateway Timeout
```

```json
{
  "success": false,
  "message": "The weather service took too long to respond."
}
```

---

## 🌐 External Service Unavailable

Status Code:

```text
503 Service Unavailable
```

```json
{
  "success": false,
  "message": "Weather service is currently unavailable."
}
```

---

## 💾 Cached Response (Graceful Degradation)

If the weather service becomes unavailable after a successful request, the API returns the last cached result.

```json
{
  "success": true,
  "cached": true,
  "message": "Returning cached weather data.",
  "data": {
    "city": "London",
    "country": "GB",
    "temperature": 18.3,
    "feelsLike": 17.9,
    "humidity": 73,
    "weather": "Clouds",
    "description": "overcast clouds",
    "windSpeed": 4.5
  }
}
```
---

---

# 🏛️ DecodeLabs Architecture Roles

This project was designed around four core backend engineering roles introduced by the DecodeLabs Backend Internship.

## 🔐 1. The Vault (Credential Safeguarding)

The backend securely manages sensitive credentials to ensure API keys are never exposed to clients.

### Implementation

- Stored the OpenWeatherMap API key in a local `.env` file.
- Excluded `.env` from version control using `.gitignore`.
- Routed all external API requests through the backend so the client never has access to the private API key.

---

## 📨 2. The Messenger (Managing Latency)

External API requests can take time to complete. The backend uses asynchronous programming to avoid blocking the server while waiting for responses.

### Implementation

- Used `async/await` for all external API requests.
- Integrated Axios for HTTP communication.
- Configured a **5000ms timeout** to prevent hanging connections.
- Allowed the server to continue handling other requests while waiting for the weather service.

---

## 🔄 3. The Translator (Schema Alignment)

Third-party APIs often return large amounts of unnecessary information. The backend transforms this data into a clean, frontend-friendly response.

### Implementation

- Filtered unnecessary fields from the OpenWeatherMap response.
- Renamed external properties into meaningful names:
  - `name` → `city`
  - `temp` → `temperature`
  - `feels_like` → `feelsLike`
- Returned a simplified and consistent JSON structure for client applications.

---

## 🛡️ 4. The Shield (Resilience Engineering)

The backend is designed to handle failures gracefully without crashing the application.

### Implementation

- Wrapped external API calls inside `try/catch` blocks.
- Handled common failure scenarios:
  - Invalid city (`404`)
  - Network failures (`503`)
  - Request timeout (`504`)
  - Unexpected server errors (`500`)
- Implemented in-memory caching as a graceful fallback, allowing the API to return the last successful response when the external weather service is temporarily unavailable.

---

## 🔒 Security

- API keys are stored securely in a `.env` file.
- Sensitive credentials are excluded from version control using `.gitignore`.
- Clients never communicate directly with the third-party API.

---

## 📚 Concepts Demonstrated

- REST API Development
- Third-Party API Integration
- Asynchronous Programming (`async/await`)
- Axios HTTP Client
- Environment Variables
- API Key Management
- Error Handling
- Timeout Management
- Data Transformation
- Response Mapping
- Graceful Degradation
- Backend Proxy Pattern

---

## 🎯 Learning Outcomes

This project demonstrates how to:

- Securely consume third-party APIs.
- Build backend proxy services.
- Transform complex external JSON into clean API responses.
- Handle network failures gracefully.
- Improve application reliability through caching.
- Follow backend development best practices.

---

## 📄 License

This project was developed for educational purposes as part of the **DecodeLabs Backend Internship**.

---
---

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