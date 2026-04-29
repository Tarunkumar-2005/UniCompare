# UniCompare – College Discovery & Decision Platform

UniCompare is a production-grade MERN stack MVP designed to help users discover top colleges, compare them side-by-side, and save their favorites to a personal dashboard. It features a modern, glassmorphic UI, dynamic scoring systems, and smart tagging.

## ✨ Features

### Core Functionality
- **Discover Colleges**: Browse a list of top colleges with a premium UI and micro-animations.
- **Search & Filters**: Search colleges by name, or filter them by location and maximum fees.
- **Detailed College Views**: Dedicated pages for each college displaying courses, placement statistics, and reviews.
- **Compare Colleges**: Select up to 3 colleges for a side-by-side comparison, with dynamic highlighting for the "Most Affordable", "Highest Placement Rate", and "Overall Best Score".
- **User Authentication**: Secure Sign-up and Login using JWT.
- **Saved Dashboard**: Logged-in users can bookmark colleges and manage them from a dedicated "Saved Colleges" page.

### Standout Features
- **Decision Score Algorithm**: Every college gets a dynamic score out of 100 based on a weighted calculation of its placement percentage and rating.
- **Smart Tags**: Colleges automatically earn visual tags (like "Best ROI", "Top Placement", "Budget Friendly") based on predefined thresholds.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Context API, Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ORM).
- **Authentication**: JWT & bcryptjs.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
If you haven't already, clone this repository and navigate to the project directory:
```bash
git clone <your-repo-url>
cd unstoptask
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and setup your environment variables.
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/unicompare  # Or use your MongoDB Atlas URI
JWT_SECRET=supersecretjwtkey_change_me_in_production
```

**Seed the Database (Optional but recommended):**
To populate your database with initial mock colleges:
```bash
node seed.js
```

**Start the Backend Server:**
```bash
npm run dev
```
The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies.
```bash
cd frontend
npm install
```

**Start the Frontend Server:**
```bash
npm run dev
```
The application will open in your browser, typically at `http://localhost:5173`.

## 📂 Project Structure

```
unstoptask/
│
├── backend/
│   ├── models/           # Mongoose models (User, College)
│   ├── routes/           # Express routes (auth, colleges, user)
│   ├── middleware/       # JWT Auth protection middleware
│   ├── server.js         # Entry point for backend
│   └── seed.js           # Mock data populator
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components (Navbar, CollegeCard)
    │   ├── context/      # React Context for Global State (Auth)
    │   └── pages/        # Views (Home, Login, Signup, Compare, etc.)
    ├── tailwind.config.js
    └── postcss.config.js
```
