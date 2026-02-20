

# 📌 Complaint Management System (Admin Panel)

A full-stack Complaint Management System built using **MERN Stack** that allows users to raise complaints and admins to manage, update, and monitor them efficiently.

---

## 🚀 Features

### 👤 User

* Register & Login
* Create Complaint
* View Submitted Complaints
* Track Complaint Status
* Update Profile

### 🛠 Admin

* View All Complaints
* Filter by Department
* Update Complaint Status
* Set Priority (Low / Medium / High)
* Dashboard Overview

---

## 🏗 Tech Stack

**Frontend**

* React.js
* React Router
* Bootstrap 5
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## 📂 Project Structure

```
Admin-Panel/
│
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│
└── README.md
```

---

## 📸 Screenshots


### 🔹 Login Page



### 🔹 Dashboard



### 🔹 Complaint List


---

## 🎥 Screen Recording



---

## 📊 Sample Complaint Structure

```json
{
  "title": "Water Leakage in Office",
  "description": "There is continuous water leakage in meeting room.",
  "department": "Maintenance",
  "priority": "High",
  "status": "Pending"
}
```

---

## 🔒 Authentication Flow

* User logs in → JWT Token generated
* Token stored in localStorage
* Protected Routes using middleware
* Admin routes restricted

---

## 💡 Future Improvements

* Email Notifications
* Real-time Updates (Socket.io)
* Charts & Analytics
* File Upload for Complaints
* Role-based Dashboard

---

## ⭐ If You Like This Project

Give it a ⭐ on GitHub!

---


