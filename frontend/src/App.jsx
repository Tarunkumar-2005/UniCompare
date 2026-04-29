import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CollegeDetail from './pages/CollegeDetail';
import Compare from './pages/Compare';
import SavedColleges from './pages/SavedColleges';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/college/:id" element={<CollegeDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/saved" element={<SavedColleges />} />
        </Routes>
      </main>
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} UniCompare. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
