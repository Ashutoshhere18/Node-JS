# 🍲 Recipe Sharing Platform

A full-stack Recipe Sharing Platform built using **MERN Stack (MongoDB, Express, React, Node.js)** with JWT Authentication, Cookie-based session handling, Role-Based Access Control, Multi-user support, and Bootstrap UI.

---

## 📌 Project Features

### 🔐 Authentication & Authorization
- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Token Generation
- Token stored in HTTP-only Cookies
- Logout functionality
- Role-Based Access Control (Admin / User)

### 👥 Multi-User Support
- Each user can create their own recipes
- Users can view only their recipes
- Admin can delete any recipe
- Role stored inside JWT

### 🍽 Recipe Management
- Add Recipe
- View All Recipes
- View My Recipes
- Delete Recipe (Admin only)
- MongoDB Populate used to show recipe creator

### 💬 Comment System
- Add comment to a recipe
- View comments for a recipe
- Comments linked with User and Recipe
- Populate used to show comment author

### 🎨 UI Features
- Built using React (JSX)
- Bootstrap based clean layout
- Culinary themed navbar
- Simple and responsive card design

---
🎥 Screen Recording

https://github.com/user-attachments/assets/c11bb025-c57a-4bf0-b4cf-f5ae00160324


---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Bootstrap 5

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- CORS
- dotenv

---

## 📂 Project Structure


recipe-platform/
│
├── backend/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── main.jsx


---


🎯 Learning Outcomes

Implemented JWT Authentication with Cookies

Used Role-Based Access Control

Applied MVC Architecture

Used MongoDB Populate for relational data

Built Full Stack MERN Application

Integrated Backend and Frontend securely.
