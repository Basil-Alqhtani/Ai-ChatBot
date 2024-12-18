# Ai-ChatBot
This AI-powered chatbot is trained to provide accurate information and answer questions about the College of Telecom and Information in Jeddah. It understands natural language and interacts seamlessly, offering a human-like conversational experience.

# Smart Chat - Full-Stack AI Chatbot Application

## 📝 Project Overview

This is a full-stack AI chatbot application built with Node.js, Express, MongoDB, and OpenAI's Assistant API. The application provides user authentication and an AI-powered conversational interface.
## 🚀 Installation Steps

### 1. Clone the Repository
```bash
https://github.com/Basil-Alqhtani/Ai-ChatBot.git

```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key
ASSISTANT_ID=your_openai_assistant_id
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Application
```bash
npm start
```


## 🔑 Account Prerequisites

### 1. MongoDB Atlas Account Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster:
   - Choose the free tier (M0 Sandbox)
   - Select a cloud provider (AWS/Google Cloud/Azure)
4. Create a database user:
   - Go to Database Access
   - Add a new database user
   - Note down your username and password
5. Set up network access:
   - Whitelist your IP address or choose "Access from Anywhere" for development

### 2. OpenAI Account Setup
1. Visit [OpenAI Platform](https://platform.openai.com/signup)
2. Create an account
3. Navigate to API Keys section
4. Generate a new API key
5. Create an Assistant:
   - Go to [OpenAI Assistants](https://platform.openai.com/assistants)
   - Create a new Assistant
   - Note down the Assistant ID

## 🛠 Model Flexibility

In `server.js`, you can easily change the AI model by modifying the OpenAI configuration:

```javascript
// Example of changing the model in the conversation route
const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: process.env.ASSISTANT_ID,
    // Optional: Specify a different model if needed
    model: "gpt-4-turbo", // or "gpt-4-mini", "gpt-3.5-turbo"
});
```

Key points about model selection:
- Different models have varying capabilities and pricing
- `gpt-4-turbo` offers advanced reasoning
- `gpt-3.5-turbo` is more cost-effective
- Check OpenAI documentation for the latest model options

# Smart Chat - Full-Stack AI Chatbot Application

## 📝 Project Overview

This is a full-stack AI chatbot application built with Node.js, Express, MongoDB, and OpenAI's Assistant API. The application provides user authentication and an AI-powered conversational interface.

## ✨ Features

- User Registration and Authentication
- Protected AI Conversation Endpoint
- Message Limit Middleware
- MongoDB Database Integration
- JWT-based Authentication
- OpenAI Assistant Integration

## 🛠 Technologies Used

- **Backend**: 
  - Node.js
  - Express.js
- **Database**: 
  - MongoDB (with Mongoose)
- **Authentication**: 
  - JWT (JSON Web Tokens)
  - bcryptjs for password hashing
- **AI Integration**: 
  - OpenAI Assistant API
- **Additional Libraries**:
  - cors
  - dotenv
  - body-parser

## 📋 Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account
- OpenAI API key
- Git



## 🔐 Authentication Endpoints

### Register
- **URL**: `/auth/register`
- **Method**: POST
- **Payload**: 
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

### Login
- **URL**: `/auth/login`
- **Method**: POST
- **Payload**: 
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

## 💬 Conversation Endpoint

### Start Thread
- **URL**: `/start-thread`
- **Method**: POST
- **Headers**: `Authorization: Bearer <token>`

### Send Message
- **URL**: `/conversation`
- **Method**: POST
- **Headers**: `Authorization: Bearer <token>`
- **Payload**:
  ```json
  {
    "threadId": "thread_id_from_start_thread",
    "message": "Your message here"
  }
  ```

## 🛡 Message Limit

The application implements a message limit middleware to prevent abuse. Users are restricted in the number of messages they can send within a specific timeframe.

## 🔍 Project Structure

- `server.js`: Main server configuration
- `routes/auth.js`: Authentication routes
- `models/User.js`: User data model
- `middleware/auth.js`: JWT authentication middleware
- `middleware/checkMessageLimit.js`: Message limit middleware

## 🚧 Security Considerations

- Passwords are hashed using bcrypt
- JWT for secure authentication
- Environment variables for sensitive information
- CORS configuration
- Message rate limiting

## 📦 Dependencies

Refer to `package.json` for complete dependency list. Key dependencies include:
- Express
- Mongoose
- OpenAI
- bcryptjs
- jsonwebtoken


