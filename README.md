# Mini Task Manager

## Project Overview

Mini Task Manager is a streamlined full-stack task management application where users can sign up, log in, and manage their personal tasks. Each task has a title, description, and a status (not started, pending, completed). The backend uses JWT-based authentication with data persistence in MongoDB. The frontend is developed with React, and the backend with Node.js and Express. The entire application is containerized using Docker, allowing for easy deployment and testing.

---

## Features

- User sign up and login with JWT authentication  
- Full CRUD (Create, Read, Update, Delete) for tasks  
- Manage task statuses: not started, pending, completed  
- Persistent authentication state across page refreshes  
- Clear, simple UI with loading indicators and error handling  
- Dockerized backend, frontend, and MongoDB for easy setup  

---

## Tech Stack

- **Frontend:** React (functional components and hooks)  
- **Backend:** Node.js, Express.js, JWT authentication  
- **Database:** MongoDB (running in Docker container)  
- **DevOps:** Docker, Docker Compose for container orchestration  

---

## Setup Instructions

### Prerequisites

- Docker and Docker Compose installed on your system  
- Git to clone the repository

### Clone the repository

git clone https://github.com/gakash90/Task-assignement.git

cd backend




### Setup Environment Variables

- Copy the `.env.example` provided in both `frontend/` and `backend/` folders to `.env` and fill in the appropriate values.

Sample content for `backend/.env`:

MONGO_URI=mongodb://mongo:27017/taskdb
JWT_SECRET=your_jwt_secret_key
PORT=5000

cd frontend


Sample content for `frontend/.env`:

REACT_APP_API_URL=http://localhost:5000


### Running the Application

Start all services (frontend, backend, MongoDB) with Docker Compose:


- Frontend React app: [http://localhost:3000](http://localhost:3000)  
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## Usage

1. Open the frontend URL in your web browser.  
2. Sign up to create an account or log in with existing credentials.  
3. Create tasks with title, description, and status.  
4. Edit or delete tasks and update statuses seamlessly.  
5. Authentication state is preserved on page reloads.

---

## Time Spent and Trade-Offs

- Approximately 2-3 hours to develop the full-stack application.  
- Emphasis on clean, modular code and Docker-based setup.  
- Basic UI prioritizing clarity and usability; can be enhanced with further styling.  
- Basic error handling implemented; additional testing and UI polish remain possible improvements.

---

## License

This project is licensed under the ISC License.

---

If you have any questions or need clarifications, feel free to contact me.

---


