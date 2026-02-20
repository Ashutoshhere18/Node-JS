

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

<img width="1196" height="623" alt="Screenshot 2026-02-20 094148" src="https://github.com/user-attachments/assets/669b09a1-23bc-49d5-ab78-e2b88336409a" />



### 🔹 Dashboard

<img width="1364" height="635" alt="Screenshot 2026-02-20 094309" src="https://github.com/user-attachments/assets/7139a585-1d5c-438d-8b3d-836a777c1d4b" />



### 🔹 Complaint List

<img width="1363" height="638" alt="Screenshot 2026-02-20 094330" src="https://github.com/user-attachments/assets/ef32fd70-6100-4fbc-bea2-9d02e1626aff" />


---

## 🎥 Screen Recording



https://github.com/user-attachments/assets/754afd4a-d077-4806-9954-b7d3b6288e31



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


