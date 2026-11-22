# PassOP – Password Manager

A full-stack password manager built using React, Express and MongoDB. It allows users to store, manage and retrieve website credentials through a simple interface.

## Features

- Add, edit and delete passwords
- View stored website credentials
- Show/hide passwords
- Copy website URLs, usernames and passwords
- Persistent storage using MongoDB
- Toast notifications for user actions

## Tech Stack

- React + Vite
- Tailwind CSS
- Node.js + Express
- MongoDB
- React Toastify
- UUID

## Project Structure

```text
PassOP/
├── backend/
│   ├── server.js
│   └── package.json
├── public/
├── src/
│   └── components/
├── package.json
├── index.html
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create `backend/.env` and configure your MongoDB connection:

```env
MONGO_URI=your_mongodb_connection_string
```

The backend must read this variable using `process.env.MONGO_URI`.

### 5. Start the backend

```bash
node server.js
```

### 6. Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

## Note

This project is developed for learning full-stack web development. Passwords are currently stored as plaintext and the application does not implement production-grade authentication or encryption. Do not use it to store real credentials.