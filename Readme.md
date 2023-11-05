---

# Chat Application

This is a simple chat application built using Express.js for the backend. The application allows users to register, login, add friends, create chats, and exchange messages in real-time. The backend is implemented in Node.js with Express.js and MongoDB is used as the database. Socket.io is utilized for real-time communication between clients and the server.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)


## Prerequisites

- Node.js installed on your machine
- MongoDB set up and running
- Cloudinary account for image storage (optional)
- Nodemailer account for sending emails (optional)

## Features

- User registration and authentication
- User profile management (including profile picture)
- Adding and managing friends
- Creating private chats with friends
- Real-time messaging in private chats

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nwafor6/Chatapp-BE.git
   cd Chatapp-BE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
   CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME (optional)
   CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY (optional)
   CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET (optional)
   EMAIL_SERVICE=YOUR_EMAIL_SERVICE (optional, e.g., Gmail)
   EMAIL_USER=YOUR_EMAIL_USER (optional, email address)
   EMAIL_PASSWORD=YOUR_EMAIL_PASSWORD (optional, email password)
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Usage

1. **User Registration**: Users can register with their email, password, and username.

2. **User Login**: Registered users can log in using their email and password.

3. **Profile Management**: Users can update their profile information, including their profile picture.

4. **Friend Management**: Users can add and manage friends. Friend requests can be sent and accepted.

5. **Chat Creation**: Users can create private chats with their friends.

6. **Real-time Messaging**: Users can exchange messages in real-time with friends in private chats.

## API Endpoints

- **POST /signup**: Register a new user.
- **POST /login**: Log in an existing user.
- **PUT /update-profile/:id**: Update user profile information.
- **PUT /uploads/update-pic/:id**: Update user profile picture.
- **POST /sendmail**: Send a test email (optional).
- **POST /add-friend**: Add a friend.
- **GET /friends**: Get user's friends list.
- **POST /add-chat**: Create a new chat with a friend.
- **GET /get-chat**: Get user's chats.
- **POST /send-message**: Send a message in a chat.
- **GET /get-messages**: Get messages in a chat.

## Technologies Used

- **Node.js**: Backend JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database used for storing user data.
- **Mongoose**: MongoDB object modeling tool.
- **Socket.io**: Real-time engine for bi-directional communication between clients and server.
- **Bcrypt**: Library for hashing passwords.
- **Multer**: Middleware for handling `multipart/form-data` (used for file uploads).
- **Cloudinary**: Cloud-based image and video management service (optional, for image storage).
- **Nodemailer**: Module for sending emails (optional, for email notifications).
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing.

---

**Happy Coding!**