# Authentication System (MERN Stack)

This is a simple authentication system built using the MERN (MongoDB, Express, React, Node.js) stack. It includes user registration, login, authentication, and logout functionality using JWT and cookies.

## Features
- User registration with hashed passwords
- Secure login with JWT authentication
- Persistent authentication using cookies
- Logout functionality
- Basic UI for authentication

## Tech Stack
### Frontend:
- React
- Axios (for API requests)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose for ORM)
- bcrypt (for password hashing)
- jsonwebtoken (JWT for authentication)
- cookie-parser
- cors

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB (running locally or via a cloud service)

### Steps

#### 1. Clone the Repository
```sh
git clone https://github.com/kushal9811/AUTHENTICATION.git
cd AUTHENTICATION
```

#### 2. Install Dependencies
##### Backend
```sh
cd server  # Navigate to the backend folder
npm install
```

##### Frontend
```sh
cd client  # Navigate to the frontend folder
npm install
```

#### 3. Start the Application
##### Start MongoDB
Ensure MongoDB is running locally:
```sh
mongod --dbpath /your/mongo/data/path
```

##### Start the Backend Server
```sh
cd server
node index.js
```

##### Start the Frontend
```sh
cd client
npm start
```

## API Endpoints
### **Authentication Routes**
| Route        | Method | Description |
|-------------|--------|-------------|
| `/register`  | POST   | Register a new user |
| `/login`     | POST   | Authenticate a user |
| `/user`      | GET    | Get authenticated user details |
| `/logout`    | POST   | Logout user |

## Project Structure
```
/AUTHENTICATION
 ├── api (Backend)
 │   ├── models
 │   │   ├── User.js
 │   ├── server.js
 │
 ├── client (Frontend)
 │   ├── src
 │   │   ├── Login.js
 │   │   ├── Register.js
 │   │   ├── Home.js
 │   │   ├── App.js
 │   │   ├── UserContext.js
 │   │   ├── Navbar.js
 │   ├── public
 │   ├── package.json
```

## Future Improvements
- Role-based access control (RBAC)
- Password reset functionality
- Improved UI design with Tailwind CSS
- OAuth login (Google, GitHub, etc.)

## License
This project is licensed under the MIT License.

---

Feel free to contribute and improve the project! 🚀

