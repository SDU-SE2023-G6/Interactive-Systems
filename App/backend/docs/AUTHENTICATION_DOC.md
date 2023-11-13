# WalkPaw Authentication System Documentation

## Overview
This document outlines the authentication process in the WalkPaw application, covering user registration, login, and JWT token verification.

## API Endpoints

### User Registration
- **Method**: POST
- **Endpoint**: `/api/auth/register`
- **Request Body**:
  ```
  {
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "yourPassword"
  }
  ```
- **Response**:
  ```
  {
    "message": "User registered successfully"
  }
  ```
- **Error Responses**: 500 Internal Server Error

### User Login
- **Method**: POST
- **Endpoint**: `/api/auth/login`
- **Request Body**:
  ```
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```
  {
    "auth": true,
    "token": "<JWT_TOKEN>"
  }
  ```
- **Error Responses**: 401 Unauthorized, 404 Not Found, 500 Internal Server Error

## Middleware

### JWT Verification Middleware
This middleware verifies the JWT token in incoming requests. It is applied to protect routes that require user authentication.

## Security Features
- Passwords are hashed using bcrypt before storing in the database.
- JWTs are used for secure user authentication, with a token expiration set to 24 hours.

## Model
- **User Model**: Includes `username`, `email`, `password`, `isWalker`, `fullName`, and `address`. Passwords are hashed using bcrypt.

## Notes
Replace `<JWT_TOKEN>` with the actual token in the response examples.