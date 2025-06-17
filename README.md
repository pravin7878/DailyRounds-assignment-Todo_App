# 📝 Task Management App

A full-stack web application to manage your daily tasks efficiently.  
Built with modern technologies on both the frontend and backend.

---

## 🚀 Features

- ✅ User Authentication (Register/Login/Logout) (with private routing)
- ✅ Create, Read, Update, and Delete (CRUD) tasks
- ✅ Mark tasks as **Completed** or **Pending**
- ✅ Filter tasks based on status
- ✅ Responsive design for all devices
- ✅ Secure APIs with proper validation
- ✅ Real-time updates (optional if implemented)

---

## 🛠️ Tech Stack

**Frontend**:
- React.js
- Redux (for state management)
- Tailwind CSS / Chakra UI / Custom CSS
- Axios (for API calls)

**Backend**:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- bcrypt.js (for password hashing)

**Other Tools**:
- Postman (for API testing)
- Git & GitHub (Version Control)

---


## 📦 Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/pravin7878/full-stack_task_management_app.git
```

### 2. Setup the Backend
```
cd Backend
npm install
npm start
```
Backend will run on http://localhost:8080

### 3. Setup the Frontend
``` 
cd Frontend
npm install
npm run dev
```
Frontend will run on http://localhost:5173

### 🔒 Environment Variables
- **For Frontend**
Create a .env file in the Frontend directory and add:
```
VITE_BACKEND_URI=http://localhost:8080
```

- **For Backend**
Create a .env file in the Frontend directory and add:
```
PORT = 8080
MONGO_URI = <your_mongodb_connection_string>/task_manager
JWT_SECRET_KEY = todo1234
```


## 📚 API Endpoints Overview

| Method | Endpoint          | Description              |
|:------:|:------------------|:--------------------------|
| POST   | `/user/register` | Register a new user      |
| POST   | `/user/login`    | Login user               |
| GET    | `/tasks`         | Get all tasks            |
| POST   | `/tasks`         | Create a new task        |
| PATCH  | `/tasks/:id`     | Update an existing task  |
| DELETE | `/tasks/:id`     | Delete a task            |



