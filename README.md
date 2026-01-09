# Smart Hostel Room Allocation System

A full-stack MERN application to efficiently manage and allocate hostel rooms based on student requirements. The system allows administrators to add rooms, view all rooms, search/filter by criteria, and automatically allocate the smallest suitable room for a given number of students.

## ✨ Features

- **Add New Room**: Register rooms with capacity, AC, and washroom info  
- **View All Rooms**: See complete list of available rooms in a responsive grid  
- **Search & Filter**: Find rooms by:
  - Minimum capacity
  - AC availability
  - Attached washroom availability
- **Auto Room Allocation**: Get the **smallest suitable room** for N students based on requirements
- **Real-time Feedback**: Success/error messages for all operations

## 🛠 Tech Stack

| Layer | Technology |
|------|------------|
| **Frontend** | React.js, Tailwind CSS, Axios, React Router |
| **Backend** | Node.js, Express.js, Mongoose |
| **Database** | MongoDB (local or MongoDB Atlas) |
| **Dev Tools** | Nodemon, VS Code |
| **Deployment** | Vercel (Frontend), Render (Backend), MongoDB Atlas (DB) |

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- npm
- MongoDB (running locally or MongoDB Atlas account)

### Backend Setup
1. Open terminal in project folder
2. Navigate to backend:
   ```bash
   cd smart-hostel-backend
