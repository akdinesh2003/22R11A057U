# Backend Test Submission

## Overview

Express.js backend implementation for URL shortening service with comprehensive API endpoints and logging integration.

## Files

- `server/index.js` - Main Express.js server
- `server-start.js` - Server startup with authentication
- `package.json` - Dependencies and scripts

## Features

### ✅ API Endpoints

- `POST /shorturls` - Create short URL
- `GET /shorturls/:shortcode` - Get statistics
- `GET /:shortcode` - Redirect to original URL
- `GET /health` - Health check
- `GET /terms` - Terms and conditions

### ✅ Core Functionality

- **URL Shortening**: Create short URLs with custom shortcodes
- **Statistics Tracking**: Detailed click analytics
- **URL Redirection**: Proper redirect functionality
- **Error Handling**: Appropriate HTTP status codes
- **Input Validation**: URL and parameter validation

### ✅ Technical Implementation

- **Express.js Framework**: RESTful API design
- **Custom Logging**: Integration with logging middleware
- **CORS Support**: Cross-origin requests
- **JSON Responses**: Structured API responses
- **Error Management**: Comprehensive error handling

## Installation

```bash
npm install
```

## Running

```bash
npm start
```

## API Testing

### Create Short URL
```bash
curl -X POST http://localhost:5000/shorturls \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com", "validity": 30, "shortcode": "test123"}'
```

### Get Statistics
```bash
curl http://localhost:5000/shorturls/test123
```

### Health Check
```bash
curl http://localhost:5000/health
```

## Screenshots

### API Testing with Postman/Insomnia

**Create URL Request:**
- Method: POST
- URL: http://localhost:5000/shorturls
- Body: `{"url": "https://www.youtube.com", "validity": 60, "shortcode": "test123"}`
- Response: `{"shortLink": "http://localhost:5000/test123", "expiry": "2025-08-02T07:28:36.095Z"}`

**Get Statistics Request:**
- Method: GET
- URL: http://localhost:5000/shorturls/test123
- Response: Complete statistics with click data

**Health Check:**
- Method: GET
- URL: http://localhost:5000/health
- Response: `{"status": "OK", "timestamp": "2025-08-02T06:46:21.222Z"}`

## Error Handling

- **400 Bad Request**: Invalid URL format
- **404 Not Found**: Shortcode not found
- **409 Conflict**: Shortcode already exists
- **410 Gone**: URL expired
- **500 Internal Server Error**: Server errors

## Logging Integration

All API calls are logged through the custom logging middleware:
- ✅ Request logging
- ✅ Response logging
- ✅ Error logging
- ✅ Authentication logging

## Compliance

- ✅ **No external algorithm libraries** - Custom implementation
- ✅ **Proper error handling** - Appropriate HTTP status codes
- ✅ **Input validation** - URL and parameter validation
- ✅ **RESTful design** - Proper HTTP methods
- ✅ **Logging integration** - Custom middleware usage 