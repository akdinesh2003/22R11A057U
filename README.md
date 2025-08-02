# Campus Hiring Evaluation - Full Stack

## Repository Structure

This repository contains the complete implementation for the Campus Hiring Evaluation - Full Stack track.

### 📁 Folder Structure

```
22R11A05U7/
├── 📁 logging-middleware/          # Custom logging implementation
├── 📁 backend-test-submission/     # Express.js backend API
└── 📁 frontend-test-submission/    # React frontend application
```

### 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   # Backend
   cd backend-test-submission
   npm install
   
   # Frontend
   cd frontend-test-submission
   npm install
   ```

2. **Start Backend**
   ```bash
   cd backend-test-submission
   npm start
   ```

3. **Start Frontend**
   ```bash
   cd frontend-test-submission
   npm start
   ```

### 🔗 Access Points

- **Backend API**: http://localhost:5000
- **Frontend App**: http://localhost:3000
- **Health Check**: http://localhost:5000/health
- **Terms**: http://localhost:5000/terms

### 📋 Features Implemented

#### Backend (Express.js)
- ✅ URL shortening with custom shortcodes
- ✅ Statistics tracking and analytics
- ✅ URL redirection functionality
- ✅ Error handling and validation
- ✅ RESTful API endpoints
- ✅ Custom logging middleware integration

#### Frontend (React + Material UI)
- ✅ Responsive web application
- ✅ URL creation interface
- ✅ Statistics visualization
- ✅ Terms and conditions page
- ✅ Material UI styling
- ✅ API integration

#### Logging Middleware
- ✅ Custom logging implementation
- ✅ External service integration
- ✅ Authentication handling
- ✅ Structured log format

### 🛠️ Technical Stack

- **Backend**: Express.js, Node.js
- **Frontend**: React, Material UI
- **Logging**: Custom middleware
- **Dependencies**: axios, nanoid, moment, cors

### 📸 Screenshots

Please refer to the individual folders for detailed screenshots and documentation.

### 📝 API Endpoints

- `POST /shorturls` - Create short URL
- `GET /shorturls/:shortcode` - Get statistics
- `GET /:shortcode` - Redirect to original URL
- `GET /health` - Health check
- `GET /terms` - Terms and conditions

### 🔒 Security

- Input validation and sanitization
- Error handling with appropriate HTTP status codes
- CORS configuration
- Secure logging practices

### 📊 Testing

All endpoints have been tested with:
- ✅ URL creation with custom shortcodes
- ✅ Statistics retrieval
- ✅ URL redirection
- ✅ Error handling scenarios
- ✅ Logging functionality

---

**Note**: This repository contains complete, production-ready code following best practices and coding standards. 