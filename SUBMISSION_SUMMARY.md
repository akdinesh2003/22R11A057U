# Campus Hiring Evaluation - Full Stack Submission

## Student Information
- **Name**: AK DINESH
- **Roll Number**: 22R11A05U7
- **Email**: 22r11a05u7@gcet.edu.in
- **Access Code**: zfTqvg

## Project Overview
A complete URL shortener application with React frontend and Express backend, fully integrated with Affordmed logging middleware.

## Technical Stack
- **Backend**: Express.js, Node.js
- **Frontend**: React, Material UI
- **Logging**: Custom Affordmed middleware
- **Dependencies**: axios, nanoid, moment, cors

## Project Structure
```
project/
├── README.md                    # Simple documentation
├── config.js                    # Affordmed credentials
├── server-start.js              # Server startup with auth
├── logging-middleware.js        # Custom logging module
├── package.json                 # Dependencies
├── server/
│   └── index.js                # Express backend
└── client/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js              # Main React app
        ├── index.js            # React entry point
        └── components/
            ├── UrlShortener.js # URL creation page
            ├── UrlStatistics.js # Statistics page
            └── TermsAndConditions.js
```

## Features Implemented

### ✅ Backend API Endpoints
- `POST /shorturls` - Create short URLs
- `GET /shorturls/:shortcode` - Get statistics
- `GET /:shortcode` - Redirect to original URL
- `GET /health` - Health check
- `GET /terms` - Terms and conditions

### ✅ Frontend Pages
- **URL Shortener Page**: Create up to 5 URLs with custom shortcodes
- **Statistics Page**: View click data and analytics
- **Terms & Conditions Page**: Display project terms

### ✅ Core Features
- **Custom shortcodes**: Users can provide preferred shortcodes
- **Default validity**: 30 minutes if not specified
- **Unique shortcodes**: Globally unique generation
- **URL validation**: Proper URL format checking
- **Error handling**: Appropriate HTTP status codes
- **Statistics tracking**: Click counts and details

### ✅ Affordmed Integration
- **Authentication**: Bearer token with Affordmed test server
- **Logging**: All actions logged to external API
- **No console.log**: Custom logging middleware only
- **Log IDs**: `ee7d05f9-4288-4273-a52d-dbdc5185b4b6`, `f035ad76-2919-4587-8e28-b94ba9847223`, etc.

## Credentials Used
- **Client ID**: b6afd394-5242-4965-895b-14d2462fcb1e
- **Client Secret**: xRgwunzucwswFeDf
- **Access Token**: Successfully obtained and used

## Testing Results

### ✅ Backend Testing
- **Health Check**: `http://localhost:5000/health` ✅
- **URL Creation**: `POST /shorturls` ✅
- **Statistics**: `GET /shorturls/test123` ✅
- **Redirection**: `GET /test123` → YouTube ✅

### ✅ Frontend Testing
- **React App**: `http://localhost:3000` ✅
- **Material UI**: Styling working ✅
- **API Integration**: Connected to backend ✅

### ✅ Sample URLs Created
- `http://localhost:5000/test123` → `https://www.youtube.com`
- `http://localhost:5000/rVaz5TqR` → `https://www.google.com`

## Compliance Checklist

### ✅ Mandatory Requirements
- [x] **Logging Middleware**: Custom implementation, no console.log
- [x] **Microservice Architecture**: Single Express service
- [x] **No Authentication**: Pre-authorized access
- [x] **Unique Shortcodes**: Globally unique generation
- [x] **Default Validity**: 30 minutes default
- [x] **Custom Shortcodes**: Optional user-provided codes
- [x] **URL Redirection**: Proper redirect functionality
- [x] **Error Handling**: Appropriate HTTP status codes
- [x] **Statistics API**: Detailed click tracking
- [x] **React Frontend**: Material UI implementation
- [x] **API Integration**: Frontend consumes backend APIs

### ✅ Technical Requirements
- [x] **RESTful API**: Proper HTTP methods
- [x] **JSON Responses**: Structured API responses
- [x] **CORS Support**: Cross-origin requests
- [x] **Input Validation**: URL and parameter validation
- [x] **Error Messages**: Descriptive error responses

## Running Instructions

### Quick Start
```bash
npm run install-all
npm start
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **Terms**: http://localhost:5000/terms

## Logging Evidence
The application successfully logs all actions to the Affordmed test server with unique IDs:
- Server startup logs
- URL creation logs
- Statistics request logs
- Error handling logs
- Authentication logs

## Conclusion
This project fully satisfies all requirements from the Campus Hiring Evaluation - Full Stack assessment. The application demonstrates:

1. **Complete functionality** for URL shortening
2. **Proper microservice architecture**
3. **Full Affordmed logging integration**
4. **Responsive React frontend**
5. **Robust error handling**
6. **Clean, beginner-friendly code**

The project is ready for evaluation and demonstrates proficiency in full-stack development with modern web technologies. 