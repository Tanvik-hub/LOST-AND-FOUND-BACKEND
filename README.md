
 # 🛠️ Lost and Found Backend

Backend for the **Lost and Found Website** built with the MERN stack. This project provides APIs to manage user authentication, posting, and searching lost or found items efficiently. Designed to streamline communication between finders and owners in a secure and scalable manner.

---

## 🚀 Features
- 🔐 **Secure User Authentication**: Password hashing with bcrypt.js and session management with JWT.
- 📋 **Post Lost/Found Items**: Allows users to post details and images of lost or found items.
- 🔎 **Advanced Search and Filters**: Supports filters based on category, location, and time.
- 📂 **Categorized Data Management**: Organizes items into user-friendly categories for efficient navigation.
- 📧 **Contact Integration**: Enables direct communication between finders and owners.

---

## 🛑 API Endpoints

| **Endpoint**                | **Method** | **Description**                           |
|-----------------------------|------------|-------------------------------------------|
| `/api/auth/register`        | `POST`     | Registers a new user.                     |
| `/api/auth/login`           | `POST`     | Logs in an existing user.                 |
| `/api/items/post`           | `POST`     | Posts a new lost or found item.           |
| `/api/items/search`         | `GET`      | Searches items based on filters.          |
| `/api/items/:id`            | `GET`      | Fetches details of a specific item.       |
| `/api/user/profile`         | `GET`      | Fetches user details and activity.        |

---

## 🛠️ Tech Stack
- **Node.js**: Backend runtime.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: Schema-based modeling for MongoDB.
- **bcrypt.js**: For secure password hashing.
- **JWT**: For user authentication and session management.

---

GOAL=BUILT THIS FOR COLLEGE PURPOSE.


